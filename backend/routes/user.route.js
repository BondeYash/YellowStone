import * as userController from '../controller/user.controller.js';
import {Router } from 'express'
import { body} from 'express-validator';
import { authMiddleware } from '../middleware/auth.middleware.js';


const router = Router();

router.post('/register',
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    userController.createUserController);

router.post ('/login' , 
    body('email').isEmail().withMessage('Invalid email'),
    body('password').exists().withMessage('Password is required'),
    userController.loginUserController
)

router.get('/profile' , authMiddleware ,  userController.getUserProfileController);

router.get('/all-users' , authMiddleware , userController.getAllUserController)

router.get('/logout', authMiddleware, userController.logOutUserController);



export default router;
