import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../models/User.model';
import Profile from '../models/Profile.model';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const userFound = await User.findOne({ email });

        if (userFound) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const encrypted = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: encrypted });
        const saved = await newUser.save();

        const newProfile = new Profile({ user: saved._id });
        const savedProfile = await newProfile.save();

        const token = await jwt.sign(
            { userId: saved._id, email, profileId: savedProfile._id },
            process.env.API_SECRET as string
        );

        res.json({ token });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const passwordMatched = await bcrypt.compare(password, userFound.password);

        if (!passwordMatched) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const profileFound = await Profile.findOne({ user: userFound._id });

        const token = await jwt.sign(
            { email, userId: profileFound?.user, profileId: profileFound?._id },
            process.env.API_SECRET as string
        );

        res.json({ token });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const notFound = (req: Request, res: Response) => {
    res.status(404).json({ msg: 'Route not found!' });
};
