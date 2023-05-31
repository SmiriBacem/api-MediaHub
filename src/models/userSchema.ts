import mongoose, { Schema, Document } from 'mongoose';
import { IUser }  from '../Helper/Interfaces/userInerface';


const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUser>('User', userSchema);