import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedUser {
    id: string;
}

export interface RequestWithUser extends Request {
    user?: DecodedUser;
}


const auth: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization');

    
    if (!token) {
        res.status(401).json({ msg: 'No token, authorization denied' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedUser;
        (req as RequestWithUser).user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export default auth;
