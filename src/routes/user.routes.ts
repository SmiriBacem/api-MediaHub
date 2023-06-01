// @ts-ignore
import express from 'express';
import { signup,getUserById, login, getUserMovieVisited } from '../controllers/userController'
import { authorizeUser } from "../Helper/authorization"
import { limiter } from '../Helper/limiter';
const router = express.Router();



// Router pour récupérer la liste des films visualiser
router.get('/vu/:userId',authorizeUser, getUserMovieVisited);


// Route pour l'inscription d'un utilisateur
router.post('/createUser', signup);

// Router pour chercher un utilisateur par ID
router.get('/:id',authorizeUser, getUserById);

// Route pour la Login
router.post('/login',limiter, login);

export default router;