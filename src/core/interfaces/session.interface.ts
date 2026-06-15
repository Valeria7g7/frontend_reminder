import type { IUser } from "@/modules/user/interface/User.interface";

export interface SessionUser{
    id:string;
    email:string;
    name:string;

}
export interface ISessionProfile{
    user:IUser//SessionUser;
    abilities:string[];
    roles:string[];

}
export interface AuthTokens{
    accessToken:string;
    refreshTocken?:string;
}
export interface PersistedSession{
    profile?:ISessionProfile|null;
    token?:AuthTokens|null; 
}
export interface SessionState{
    profile?:ISessionProfile|null;
    token?:AuthTokens|null;
    isAuthenticated:boolean;
    isRestoring:boolean;
    setSession:(payload: { profile: ISessionProfile, token: 
        AuthTokens 
//String
    }) => void;
    setProfile:(profile:ISessionProfile)=>void;
    clearSession: () => void;
   // restoreSession: () => void;
    logout: (options?: { propagate?: boolean }) => void;
}