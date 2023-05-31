// @ts-ignore
import express, { Request, Response, NextFunction } from 'express';
// @ts-ignore
import jwt from 'jsonwebtoken';
import User from '../../models/userSchema';


interface CustomRequest extends Request {
    user?: any;
}

export const authorizeUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1] || req.query.token;
    if (!token) {
      return res.status(401).json({ message: "Jeton d'autorisation introuvable" });
    }
  
    try {
      const decoded = jwt.verify(token, 'MediaHub-Key');
      req.user = decoded;
  
      const userId = req.user.userId;

      // Retrieve user information from the database
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      
      // Verify if the token belongs to the correct user
      if (req.user.userId !== userId.toString()) {
        return res.status(401).json({ message: "L'accès non autorisé" });
      }
  
      // Attach the user information to the request object for further use
      req.user = user;
  
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Jeton invalide ou expiré' });
    }
  };