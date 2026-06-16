import { useEffect, useRef } from 'react';
import type { JSX, PropsWithChildren } from 'react';
import { useLogin } from '../hooks/useLogin';
import { sessionStore } from '@/core/store/sessionStore';

export const RestoreSession=({children}:PropsWithChildren):JSX.Element=>{
 const {restore,logout,validate,isRestoring}=useLogin();
/*  const restoreSession=async()=>{
    restore();
 } */
 useEffect(()=>{
   // restoreSession()
    /* const currentState=sessionStore.getState();
    if(currentState.token?.access_token){
        validate();
    } */


 },[restore,logout])
if(isRestoring){
    return <div>Restoring session...</div>
}
return <>{children}</>

}