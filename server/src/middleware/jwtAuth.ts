import { config } from "dotenv";
import { expressjwt, Request as JwtAuthExpressRequest } from "express-jwt";
import { Secret } from "jsonwebtoken";

config({ path: ".env.local" });

const SECRET = process.env.SECRET as Secret;

export const jwtAuthExpress = expressjwt({
  secret: SECRET,
  algorithms: ["HS256"],
});

export type { JwtAuthExpressRequest };
