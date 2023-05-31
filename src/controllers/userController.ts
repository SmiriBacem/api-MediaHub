// @ts-ignore
import { Request, Response } from 'express';
import User from '../models/userSchema';
import { IUser }  from '../Helper/Interfaces/userInerface';
// @ts-ignore
import bcrypt from 'bcrypt';
// @ts-ignore
import jwt from 'jsonwebtoken';

// Création d'un nouveau utilisateur
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    // Vérifier si l'utilisateur existe ou pas
    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Utilisateur existe déjà' });
    }
    // Création du nouveau utilisateur
    const newUser = new User({
      name,
      email,
      password,
    });
    // Enregistrer de l'utilisateur dans la base de donnée
    await newUser.save();
    res.json({ message: 'Utilisateur créer avec success' });
  } catch (error) {
    console.log("error",error)
    res.status(500).json({ message: "Erreur lors de l'enregistrement" });
  }
};

// Utilisateur s'authentifie login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Chercher l'utilisateur par son email
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    // Comparer les deux mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Mot de passe fournie est incorrecte' });
    }
    // Créer un JWT token
    const token = jwt.sign({ userId: user._id }, 'MediaHub-Key', { expiresIn: 3600 });
    res.json({ token , user });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'authentification" });
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