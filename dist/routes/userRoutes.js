"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = __importDefault(require("../middleware/auth"));
const upload_1 = __importDefault(require("../middleware/upload"));
const router = express_1.default.Router();
router.post('/register', upload_1.default.single('profilePicture'), userController_1.registerUser);
router.post('/login', userController_1.loginUser);
router.get('/profile', auth_1.default, userController_1.getUserProfile);
router.put('/profile', auth_1.default, upload_1.default.single('profilePicture'), userController_1.updateUserProfile);
exports.default = router;
