export interface User{
    _id?: string;
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    age?: number;
    photo?: string;
    isActive?: boolean;
}