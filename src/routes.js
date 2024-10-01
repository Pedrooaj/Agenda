import { Router } from "express";
import { index } from "./controllers/home.js";
import login from "./controllers/login.js";

export const Routes = Router();


Routes.get('/', index);

// rotas de login

Routes.get('/login', login.index);
Routes.post('/login/login', login.login)
Routes.post("/login/register", login.register);
