// @ts-ignore
import express from 'express';
import { signup,getUserById, login } from '../controllers/userController'
import { authorizeUser } from "../Helper/authorization"
import { limiter } from '../Helper/limiter';
const router = express.Router();

// Route pour l'inscription d'un utilisateur
router.post('/createUser',limiter, signup);

// Router pour chercher un utilisateur par ID
router.get('/:id',authorizeUser, limiter, getUserById);

// Route pour la Login
router.post('/login',limiter, login);

export default router;