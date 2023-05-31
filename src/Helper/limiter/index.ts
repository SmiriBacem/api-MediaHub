import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 1000, // 1 seconde
  max: 1, // 1 requete par Fenetre
  message: "Too many requests, please try again later.",
});
