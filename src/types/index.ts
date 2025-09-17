import type { ComponentType } from "react";
import type { IMeta } from "./tour.type";

export type {
  IRegisterResponse,
  IRegister,
  ILoginResponseData,
  ILogin,
  ISendOtp,
  IVerifyOtp,
  IUserUpdate
} from "./auth.type";

export type { ITourResponse, ITourType, ITourTypeResponse, IDivision, IDivisionResponse } from "./tour.type";
export type { IBookingResponse, IBooking, TBookingStatus, IBookingData } from './booking.type';

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: IMeta
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}
