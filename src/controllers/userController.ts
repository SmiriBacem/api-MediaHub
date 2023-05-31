// @ts-ignore
import { Request, Response } from 'express';
import User from '../models/userSchema';
import { IUser }  from '../Helper/Interfaces/userInerface';

// Création d'un nouveau utilisateur
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const newUser: IUser | any = new User({ name, email, password });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Utilisateur existe déjà' });
  }
};

// chercher un utilisateur Par son ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Impossible de trouver ce utilisateur' });
  }
};