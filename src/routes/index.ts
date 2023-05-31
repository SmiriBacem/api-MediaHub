// @ts-ignore
import express from "express";

// Importation des routes
import userRoute from "./user.routes";
import movieRoute from "./movie.routes";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/movie",
    route: movieRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;