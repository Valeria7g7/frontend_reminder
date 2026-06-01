import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { ILogin } from '@/modules/login/interface/Login.interface';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

class LoginResource {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: `${API_BASE_URL}/api/auth`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async login(credentials: { email: string; password: string }): Promise<ILogin> {
        const response = await this.api.post('/login', credentials);
        console.log("response", response.data);
        return response.data;
    }
  


}

export default new LoginResource();