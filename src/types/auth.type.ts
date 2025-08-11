export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponseData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER" | "GUIDE";
export type TIsActive = "ACTIVE" | "INACTIVE" | "BLOCKED";
export interface IAuthProvider {
  provider: "Google" | "Credential";
  providerId: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: TRole;
  isDeleted: boolean;
  isActive: TIsActive;
  isVerified: boolean;
  auths: IAuthProvider;
  createdAt: string;
  updatedAt: string;
  phone?: string;
  address?: string;
}

export interface IRegisterResponse {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: TRole;
  isDeleted: boolean;
  isActive: TIsActive;
  isVerified: boolean;
  auths: IAuthProvider;
  createdAt: string;
  updatedAt: string;
}

export interface ISendOtp {
  email: string;
}

export interface IVerifyOtp {
  email: string;
  otp: string;
}