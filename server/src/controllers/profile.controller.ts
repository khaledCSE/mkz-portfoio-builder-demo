import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { promisify } from 'util';
import Profile from '../models/Profile.model';
import User from '../models/User.model';

const ALLOWED_EXTENSIONS = /png|jpg|jpeg|webp/;

export interface iAPIUser {
    email: string;
    userId: string;
    profileId: string;
}

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, age, workExperiences } = req.body;
        const api_user: iAPIUser = req.body.api_user;

        const to_update: any = { firstName, lastName, email, age, workExperiences };

        const userFound = await User.findById(api_user.userId);

        if (!userFound || userFound.email !== api_user.email) {
            return res.status(401).json({ msg: 'You can only edit your profile' });
        }

        const profileFound = await Profile.findById(api_user.profileId);

        if (req.files) {
            const image = <UploadedFile>req.files.image;
            const extName = image.name.split('.')[image.name.split('.').length - 1];

            if (!ALLOWED_EXTENSIONS.test(extName)) {
                return res.status(400).json({ msg: 'Only Image files are acceptable' });
            }
            const url = `${path.resolve('server', 'uploads')}/${email}.${extName}`;

            await promisify(image.mv)(url);

            const imageUrl = `${process.env.SERVER_ADDRESS}/uploads/${email}.${extName}`;

            to_update.profilePicture = imageUrl;
        }

        const updated = await Profile.findByIdAndUpdate(profileFound?._id, to_update);

        res.json({ msg: 'success' });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const getSingleProfile = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const profile = await Profile.findById(id);

        res.json(profile);
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};
