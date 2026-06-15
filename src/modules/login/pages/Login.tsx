import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {sessionStore} from '@/core/store/sessionStore';
import type { AuthTokens } from '@/core/interfaces/session.interface';
import type { ILoginResponse } from '../interface/Login.interface';
import {useNavigate} from 'react-router-dom';
import {useLogin} from '../hooks/useLogin';
//importamos el recurso de login
import LoginResource from '../resources/LoginResources';
const Login: React.FC = () => {
    const {login}=useLogin();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Por favor completa todos los campos');
            return;
        }
        login(email,password);
        navigate('/products');
  /*       console.log("datos", { email, password });
        //logeamos con el recurso de login
        LoginResource.login({ email, password })
            .then((data : ILoginResponse) => {    
            const authTokens: AuthTokens = {
                    accessToken: data.token, 
                }
                sessionStore.getState().setProfile({user:data.user, abilities:[], roles:[]});
                sessionStore.getState().setSession({ profile:{ user:data.user, abilities:[], roles:[]}, token: authTokens });
              navigate('/products');
            })
            .catch((error) => {
                console.error('Login failed:', error);
                setError('Credenciales incorrectas');
            }) */;

       
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Ingresa tu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                Contraseña
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && (
                            <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                                {error}
                            </div>
                        )}
                        <Button type="submit" className="w-full">
                            Ingresar
                        </Button>
                          <a href="/register" className="text-blue-600 font-semibold hover:text-blue-800 transition">
                            ¿No tienes cuenta? Regístrate aquí
                        </a>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;