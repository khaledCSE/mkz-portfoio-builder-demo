import { Document, model, Schema } from 'mongoose';

interface iUserDocument extends Document {
    email: string;
    password: string;
}

const UserSchema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const User = model<iUserDocument>('users', UserSchema);
export default User;
