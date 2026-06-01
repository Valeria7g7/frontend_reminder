import { createStore } from 'zustand/vanilla';
import type { ISessionProfile, AuthTokens, PersistedSession, SessionState } from '@/core/interfaces/session.interface';
const STORAGE_KEY = 'session';

const readPersistedState = (): PersistedSession => {
  if (typeof window === 'undefined') {
    return { profile: null, token: null };
  }

  try {
    const raw = localStorage.getItem(`fallback_${STORAGE_KEY}`);
    if (raw) {
      return JSON.parse(raw) as PersistedSession;
    }
    const secureData = localStorage.getItem(`secure_${STORAGE_KEY}`);
    if (secureData) {
      return JSON.parse(secureData) as PersistedSession;
    }
    return { profile: null, token: null };
  } catch (error) {
    console.warn('Failed to read session from secure storage', error);
    return { profile: null, token: null };
  }
};

const persistState = (state: PersistedSession) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(`secure_${STORAGE_KEY}`, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to persist session state', error);
  }
};

const clearPersistedState = () => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.removeItem(`secure_${STORAGE_KEY}`);
    localStorage.removeItem(`fallback_${STORAGE_KEY}`);
  } catch (error) {
    console.error('Failed to clear persisted state', error);
  }
};

export const sessionStore = createStore<SessionState>((set) => ({
  profile: null,
  token: null,
  isAuthenticated: false,
  isRestoring: true,
  setSession: ({ profile, token }) => {
    persistState({ profile, token });
    set({ profile, token, isAuthenticated: true, isRestoring: false });
  },
  setProfile: (profile) => {
    set((current) => {
      const nextState: PersistedSession = { profile, token: current.token };
      persistState(nextState);
      return {
        profile,
        token: current.token,
        isAuthenticated: Boolean(current.token?.accessToken),
        isRestoring: false,
      };
    });
  },
  clearSession: () => {
    clearPersistedState();
    set({ profile: null, token: null, isAuthenticated: false, isRestoring: false });
  },
  restoreSession: () => {
    const persisted = readPersistedState();
    set({
      profile: persisted.profile,
      token: persisted.token,
      isAuthenticated: Boolean(persisted.token?.accessToken),
      isRestoring: false,
    });
  },
  logout: ({ propagate } = { propagate: true }) => {
    clearPersistedState();
    set({ profile: null, token: null, isAuthenticated: false, isRestoring: false });
    if (propagate && typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },
}));
