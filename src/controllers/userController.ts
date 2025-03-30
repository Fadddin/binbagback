import { Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { RequestWithUser } from '../middleware/auth';
import { Request } from 'express'

export const registerUser = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { name, email, address, password, bio } = req.body;
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : '';

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ msg: 'User already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            address,
            bio,
            profilePicture,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        res.status(201).json({ token });
    } catch (err) {
        console.error('Register Error:', err);
        res.status(500).send('Server error');
    }
};

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ msg: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ msg: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).send('Server error');
    }
};

export const getUserProfile = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ msg: 'Unauthorized' });
            return;
        }

        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            res.status(404).json({ msg: 'User not found' });
            return;
        }

        res.json(user);
    } catch (err) {
        console.error('Profile Fetch Error:', err);
        res.status(500).send('Server error');
    }
};

export const updateUserProfile = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { name, address, bio } = req.body;
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : undefined;

    try {
        if (!req.user) {
            res.status(401).json({ msg: 'Unauthorized' });
            return;
        }

        const updateData: Record<string, string | undefined> = {
            name,
            address,
            bio,
        };

        if (profilePicture) {
            updateData.profilePicture = profilePicture;
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, {
            new: true,
        }).select('-password');

        if (!updatedUser) {
            res.status(404).json({ msg: 'User not found' });
            return;
        }

        res.json(updatedUser);
    } catch (err) {
        console.error('Profile Update Error:', err);
        res.status(500).send('Server error');
    }
};
