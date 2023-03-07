import jwtDecode from "jwt-decode";
import { User } from "../types/user";

export default function (token: string) {
  try {
    const user: any = jwtDecode(token);

    if (!user || typeof user === "string") throw new Error("Token provided is invalid");

    return user as Partial<User>;
  } catch (err) {
    return {};
  }
}
