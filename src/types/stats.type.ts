export interface UserRoleStat {
  _id: string;    
  count: number;
}

export interface UserStats {
  totalUsers: number;
  totalActiveUser: number;
  totalInactiveUser: number;
  totalBlockUser: number;
  newUserInLast7Days: number;
  newUserInLast30Days: number;
  usersByRole: UserRoleStat[];
}

export interface TourTypeStat {
  _id: string; 
  count: number;
}

export interface TourStats {
  totalTours: number;
  totalTourByTourTypes: TourTypeStat[];
  totalTourByDivisions: { _id: string; count: number }[];
  totalHighestBookedTour: {
    _id: string;
    bookingCount: number;
    tour: { title: string; slug: string };
  }[];
  avgTourCost: { _id: null; avgCostFrom: number }[];
}

export interface BookingPerTour {
  _id: string;
  bookingCount: number;
  tour: { title: string; slug: string };
}

export interface BookingStats {
  totalBookings: number;
  totalBookingByStatus: { _id: string; bookingCount: number }[];
  bookingsPerTour: BookingPerTour[];
  avgGuestCountPerBooking: number;
  bookingLast7Days: number;
  bookingLast30Days: number;
  totalBookingByUniqueUsers: number;
}

export interface PaymentGateWayStat {
  _id: string; 
  count: number;
}

export interface PaymentStats {
  avgPaymentAmount: { _id: null; avgPaymentAmount: number }[];
  paymentGateWayData: PaymentGateWayStat[];
}
