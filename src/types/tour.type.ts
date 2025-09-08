export interface IMeta {
  page: number
  limit: number
  totalPage: number
  totalDocument: number
}

export interface ITourType {
  name: string;
}

export interface IDivision {
  name: string;
  thumbnail?: string;
  description?: string; 
}
export interface IDivisionResponse {
  _id: string;
  name: string;
  slug: string;
  thumbnail?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITourTypeResponse {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITourResponse {
  _id: string
  title: string
  description: string
  images: string[]
  location: string
  costFrom: number
  startDate: string
  endDate: string
  included: string[]
  excluded: string[]
  amenities: string[]
  tourPlan: string[]
  minAge: number
  maxGuest: number
  division: {
    _id: string;
    name: string
  }
  tourType: {
    _id: string;
    name: string
  }
  createdAt: string
  updatedAt: string
  slug: string
}