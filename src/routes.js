import { Router } from "express";
import { index } from "./controllers/home.js";
import login from "./controllers/login.js";

export const Routes = Router();


Routes.get('/', index);

// Rotas de Login
Routes.get('/login', login.index);
Routes.post('/login/login', login.login)
Routes.post("/login/register", login.register);
Routes.get("/login/logout", login.logout);


// Rotas de Contatos

