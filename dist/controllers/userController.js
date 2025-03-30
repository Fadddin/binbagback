"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, address, password, bio } = req.body;
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : '';
    try {
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ msg: 'User already exists' });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.default({
            name,
            email,
            address,
            bio,
            profilePicture,
            password: hashedPassword,
        });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(201).json({ token });
    }
    catch (err) {
        console.error('Register Error:', err);
        res.status(500).send('Server error');
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ msg: 'Invalid credentials' });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ msg: 'Invalid credentials' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
    }
    catch (err) {
        console.error('Login Error:', err);
        res.status(500).send('Server error');
    }
});
exports.loginUser = loginUser;
const getUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ msg: 'Unauthorized' });
            return;
        }
        const user = yield User_1.default.findById(req.user.id).select('-password');
        if (!user) {
            res.status(404).json({ msg: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        console.error('Profile Fetch Error:', err);
        res.status(500).send('Server error');
    }
});
exports.getUserProfile = getUserProfile;
const updateUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, bio } = req.body;
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : undefined;
    try {
        if (!req.user) {
            res.status(401).json({ msg: 'Unauthorized' });
            return;
        }
        const updateData = {
            name,
            address,
            bio,
        };
        if (profilePicture) {
            updateData.profilePicture = profilePicture;
        }
        const updatedUser = yield User_1.default.findByIdAndUpdate(req.user.id, updateData, {
            new: true,
        }).select('-password');
        if (!updatedUser) {
            res.status(404).json({ msg: 'User not found' });
            return;
        }
        res.json(updatedUser);
    }
    catch (err) {
        console.error('Profile Update Error:', err);
        res.status(500).send('Server error');
    }
});
exports.updateUserProfile = updateUserProfile;
