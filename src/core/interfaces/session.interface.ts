export interface SessionUser{
    id:string;
    email:string;
    name:string;

}
export interface ISessionProfile{
    user:SessionUser;
    abilities:string[];
    roles:string[];

}
export interface AuthTokens{
    accessToken:string;
    refreshTocken?:string;
}
export interface PersistedSession{
    profile?:ISessionProfile|null;
    token?:AuthTokens|null    
}
export interface SessionState{
    profile?:ISessionProfile|null;
    token?:AuthTokens|null;
    isAuthenticated:boolean;
    isRestoring:boolean;
    setSession:(payload: { profile: ISessionProfile, token: AuthTokens }) => void;
    setProfile:(profile:ISessionProfile)=>void;
    clearSession: () => void;
    restoreSession: () => void;
    logout: (options?: { propagate?: boolean }) => void;
}