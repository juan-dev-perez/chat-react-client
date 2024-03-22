export interface User {
  _id: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  age: number;
  photo?: string;
  isActive: boolean;
}

export type UserLogin = Omit<
  User,
  "_id" | "fullName" | "phone" | "age" | "photo" | "isActive"
>;

export type UserRegister = Omit<User, "_id" | "isActive">;

export type UserChat = Omit<User, "password">;

type UserUpdate = Omit<User, "_id" | "isActive" | "email" | "password">;

export type UserPartial = Partial<UserUpdate>;
