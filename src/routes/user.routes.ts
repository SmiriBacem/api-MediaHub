// @ts-ignore
import express from 'express';
import { createUser,getUserById } from '../controllers/userController'
const router = express.Router();

// Route pour l'ajout d'un utilisateur
router.post('/createUser', createUser);

// Router pour chercher un utilisateur par ID
router.get('/:id', getUserById);


export default router;