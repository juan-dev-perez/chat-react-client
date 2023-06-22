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

export type UserLogin = Omit<User, '_id'|'fullName'|'phone'|'age'|'photo'|'isActive'>;