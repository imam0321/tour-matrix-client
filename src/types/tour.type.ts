export interface IMeta {
  page: number
  limit: number
  totalPage: number
  totalDocument: number
}

export interface ITourType {
  name: string;
}

export interface ITourTypeResponse {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

