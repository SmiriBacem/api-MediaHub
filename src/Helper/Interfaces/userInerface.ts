import { IMovie } from "./movieInterface";

export interface IUser {
  name: string;
  email: string;
  password: string;
  _id? :string;
  movieHistory: IMovie[]
}
