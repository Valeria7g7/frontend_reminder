import LoginResource from '../resources/LoginResources';
import { sessionStore } from '@/core/store/sessionStore';
import type { AuthTokens } from '@/core/interfaces/session.interface';

import { useStore } from 'zustand';

export const useLogin = () => {
    const isRestoring =  useStore(sessionStore,(state) => state.isRestoring);
    const login = async (email: string, password: string) => {
        const data = await LoginResource.login({ email, password });
        const authTokens: AuthTokens = {
            accessToken: data.token,
        }
        sessionStore.getState().setProfile({ user: data.user, abilities: [], roles: [] });
        sessionStore.getState().setSession({ profile: { user: data.user, abilities: [], roles: [] }, token: authTokens });
    }
    const logout=async()=>{
        sessionStore.getState().logout();
    }
    const restore=async()=>{
         sessionStore.getState().clearSession();
        
        //sessionStore.getState().restoreSession();
    }

    const validate=async()=>{
         sessionStore.getState().clearSession();
        //sessionStore.getState().restoreSession();
    }
    return {
        login,
        logout,
        restore,
        validate,
        isRestoring
    };
}