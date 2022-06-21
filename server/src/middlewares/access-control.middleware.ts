import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = <string>req.headers['jobber-auth-token'];
        if (!token) {
            return res.status(401).json({ msg: 'Access denied' });
        }
        const token_verified = await jwt.verify(token, process.env.API_SECRET as string);
        if (token_verified) {
            const decoded = await jwt.decode(token);
            req.body.api_user = decoded;

            next();
        } else {
            return res.status(401).json({ msg: 'Access denied' });
        }
    } catch (err: any) {
        console.log(err);

        return res.status(401).json({ msg: 'Access denied' });
    }
};
