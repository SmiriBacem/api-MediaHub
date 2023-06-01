import mongoose, { Schema } from "mongoose";
import { IUser } from "../Helper/Interfaces/userInerface";
// @ts-ignore
import bcrypt from "bcrypt";

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    movieHistory: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
  },
  { timestamps: true }
);

// Hash the password before saving
userSchema.pre<IUser>("save", async function (next) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

export default mongoose.model<IUser>("User", userSchema);
