import type { IUser } from "@/modules/user/interface/User.interface";

export interface ILogin {
   /*  username: string;
    password: string;
    name: string;
    last_name: string;
    second_last_name: string;
    email: string;
    phone:string; */
}

export interface ILoginResponse {
   user: IUser;
    acces_token: string;
    refresh_token: string;
}