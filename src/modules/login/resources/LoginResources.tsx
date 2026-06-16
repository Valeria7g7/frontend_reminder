import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { ILogin, ILoginResponse } from '@/modules/login/interface/Login.interface';
import type { IUser} from "@/modules/user/interface/User.interface";
import { apiClient } from '@/core/api/apiClient';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

class LoginResource {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: `${API_BASE_URL}/auth`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async login(credentials: { email: string; password: string }): Promise<ILoginResponse> {
        const response = await this.api.post('/login', credentials, { withCredentials: true });
       //  withCredentials: true   esto es para permitir que guarde la cokie del refresh token
        const payload = response.data?.data ?? response.data;
        return payload;
    }
       async refresh():Promise<string> {
        const response = await this.api.post('/refresh',{}, { withCredentials: true });
       console.log("response")
        const payload = response.data?.data ?? response.data;
        return payload;
    }
    async register(body: IUser): Promise<ILoginResponse> {
        const response = await this.api.post('/register',body);
       // console.log("response", response.data);

        const payload = response.data?.data ?? response.data;
        return payload;
    }
      async me(): Promise<ILoginResponse> {
        const response = await apiClient.get('/auth/me');
        console.log("response de me", response.data);
        const payload = response.data?.data ?? response.data;
        return payload;
    }


}

export default new LoginResource();