// @ts-ignore
import express from 'express';
import { getMovieDetails, getMoviesList, getMoviesTriByField, searchAndSortMovies } from '../controllers/movieController'
import { authorizeUser } from "../Helper/authorization"
import { limiter } from '../Helper/limiter';
const router = express.Router();

// Route pour récupérer les films existant
router.get('/movieSorted',authorizeUser, limiter, getMoviesTriByField);

// Route pour récupérer les films existant
router.get('/searchAndSortMovies',authorizeUser, limiter, searchAndSortMovies);

// Router pour chercher un utilisateur par ID
router.get('/:movieId',authorizeUser, limiter, getMovieDetails);

// Route pour récupérer les films existant
router.get('/',authorizeUser, limiter, getMoviesList);



export default router;