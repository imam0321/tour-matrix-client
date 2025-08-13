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

