import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { IProduct } from '../interface/Product.interface';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

class ProductResource {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: `${API_BASE_URL}/api/product`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async search(params?: Record<string, any>): Promise<IProduct[]> {
        const response = await this.api.get('/getProducts', {
            params: {  ...params },
        });
        return response.data;
    }
    /* async search(query: string, params?: Record<string, any>): Promise<IProduct[]> {
    const response = await this.api.get('/getProducts', {
        params: { q: query, ...params },
    });

    console.log("data", response.data);
    return response.data; // 🔥 aquí está la clave
} */

    getById(id: string | number) {
        return this.api.get(`/getById/${id}`);
    }

    getAll(params?: Record<string, any>) {
        return this.api.get('/', { params });
    }

    create(data: IProduct) {

        return this.api.post<IProduct>('/save', data);
    }

    update(id: string | number, data: any) {
        return this.api.put(`/${id}`, data);
    }

    delete(id: string | number) {
        return this.api.delete(`/${id}`);
    }
}

export default new ProductResource();