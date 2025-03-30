import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
    name : string;
    email : string;
    password : string;
    address : string;
    bio: string;
    profilePicture: string;
}

const UserSchema = new mongoose.Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    bio: { type: String },
    profilePicture: { type: String }
});

export default mongoose.model<User>('User', UserSchema);