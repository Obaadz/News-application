import { JwtPayload } from "jsonwebtoken";
import { Document } from "mongoose";

export type User = {
  name: string;
  email: string;
  password: string;
};

export type UserFromToken = JwtPayload & Pick<Partial<User>, "email">;

export interface IUserDocument extends Document, User {}
