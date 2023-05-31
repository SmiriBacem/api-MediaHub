// @ts-ignore
import express from 'express';
import { signup,getUserById, login } from '../controllers/userController'
import { authorizeUser } from "../Helper/authorization"
const router = express.Router();

// Route pour l'inscription d'un utilisateur
router.post('/createUser', signup);

// Router pour chercher un utilisateur par ID
router.get('/:id',authorizeUser, getUserById);

// Route pour la Login
router.post('/login', login);

export default router;