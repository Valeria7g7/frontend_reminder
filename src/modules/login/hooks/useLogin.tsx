import LoginResource from '../resources/LoginResources';
import { sessionStore } from '@/core/store/sessionStore';
import type { AuthTokens } from '@/core/interfaces/session.interface';

import { useStore } from 'zustand';


export const useLogin = () => {
    const isRestoring =  useStore(sessionStore,(state) => state.isRestoring);
    const login = async (email: string, password: string) => {
        try{
        const data = await LoginResource.login({ email, password });
        const authTokens: AuthTokens = {
            access_token: data.acces_token,
            //refresh_Tocken:data.refresh_token
        }
        sessionStore.getState().setProfile({ user: data.user, abilities: [], roles: [] });
        sessionStore.getState().setSession({ profile: { user: data.user, abilities: [], roles: [] }, token: authTokens });
         return true;
    }catch{
            return false;
         }
         }
    const logout=async()=>{
        sessionStore.getState().logout();
    }
    const restore=async()=>{
       //  sessionStore.getState()
        
    }

    const validate=async()=>{
        
        const current=sessionStore.getState()
        console.log("current ",current)
        if(current && !current.token?.access_token)return logout()
        try{
    console.log("acces token ",current.token?.access_token)
    const response=LoginResource.me();
    console.log("me ",response)
    }catch(error: unknown){
    console.log("error ",error)}
    }
    return {
        login,
        logout,
        restore,
        validate,
        isRestoring
    };
}