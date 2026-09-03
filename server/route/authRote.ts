import express from "express"
import { loginUser, registerUser, userLogout, verifyUser } from "../controller/AuthController.js";
import protect from "../middleware/auth.js";
const AuthRouter=express.Router();


AuthRouter.post('/register',registerUser);
AuthRouter.post('/login',loginUser);
AuthRouter.get('/verify',protect,verifyUser)
AuthRouter.get('/logout',protect,userLogout)

export default AuthRouter;