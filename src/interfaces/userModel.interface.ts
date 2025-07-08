import { Document } from "mongoose";

export default interface UserModel {
  userName: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
