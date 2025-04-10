import mongoose, { Document, Model, Schema, Types } from "mongoose";
import bcrypt from 'bcryptjs';

// Define TypeScript interface for a User document
export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  accessToken?: string; // accessToken is optional
}

// Create a Mongoose schema using the IUser interface
const UserSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  accessToken: {
    type: String,
    required: false,
  },
});

// Hook to hash password before saving it
UserSchema.pre<IUser>("save", async function (next) {
  if (this.password && this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Transform output: convert _id to id and remove password
UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.password;
  },
});

// Create or reuse the Mongoose model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
