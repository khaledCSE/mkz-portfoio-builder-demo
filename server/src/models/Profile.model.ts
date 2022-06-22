import { Document, model, Schema } from 'mongoose';

interface iWorkExperience {
    startDate: string;
    endDate: string;
    jobTitle: string;
    company: string;
    // companyLogo?: string;
    jobDescription?: string;
}

interface iProfileDocument extends Document {
    user: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    profilePicture?: string;
    age?: number;
    workExperiences: iWorkExperience[];
}

const ProfileSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'users' },
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
        email: { type: String, default: '' },
        profilePicture: {
            type: String,
            default: 'https://www.salisburyut.com/wp-content/uploads/2020/09/avatar-1-1024x1024.jpeg',
        },
        age: { type: Number, default: 18 },
        workExperiences: {
            type: [
                {
                    startDate: { type: Date, default: '' },
                    endDate: { type: Date, default: '' },
                    jobTitle: { type: String, default: '' },
                    company: { type: String, default: '' },
                    // companyLogo: { type: String, default: '' },
                    jobDescription: { type: String, default: '' },
                },
            ],
            default: [],
        },
    },
    { timestamps: true }
);

const Profile = model<iProfileDocument>('profile', ProfileSchema);
export default Profile;
