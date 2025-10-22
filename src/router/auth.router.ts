import { Router } from "express";
import { login, signup } from "../controller/auth.controller";

const AuthRouter = Router();

AuthRouter.post("/signup", signup);
AuthRouter.post("/login", login);
AuthRouter.post("/forgot-password", login);

export default AuthRouter;
