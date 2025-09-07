export interface IBookingResponse {
  paymentUrl: string
  booking: IBooking
}

export interface IBooking {
  _id: string
  user: IUser
  tour: Tour
  status: TBookingStatus
  guestCount: number
  createdAt: string
  updatedAt: string
  payment: Payment
}

export interface IUser {
  _id: string
  name: string
  email: string
  phone: string
  address: string
}

export interface Tour {
  _id: string
  title: string
  costFrom: number
}

export interface Payment {
  _id: string
  booking: string
  transactionId: string
  status: TPaymentStatus
  amount: number
  createdAt: string
  updatedAt: string
}

export type TBookingStatus = "PENDING" | "CANCEL" | "COMPLETE" | "FAILED"
export type TPaymentStatus = "PAID" | "UNPAID" | "CANCELLED" | "FAILED" | "REFUNDED"