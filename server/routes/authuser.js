import express from 'express';
import { register, login, getCurrentUser, getAllUsers, getUserById, deleteUserById, updateUserById } from "../controllers/userController.js"
import authMiddleware from '../middlewares/authMiddleware.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Auth Routes
router.route( '/auth/register' ).post( register );
router.route( '/auth/login' ).post( login );

router.route( '/' ).get( authMiddleware, getCurrentUser ); // get current user by token
router.route( 'getUserById/:userId' ).get( authMiddleware, getUserById );
router.get('/getAllUsers',authMiddleware,adminMiddleware, getAllUsers);
router.route( '/deleteUserById/:userId' ).delete( authMiddleware, deleteUserById );
router.route( '/updateUserById/:userId' ).put( authMiddleware, updateUserById );


export default router;