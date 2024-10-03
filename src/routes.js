import { Router } from "express";
import { index } from "./controllers/home.js";
import login from "./controllers/login.js";
import { contato } from "./controllers/contato.js";
import { loginRequired } from "./middlewares/middleware.js"; //Middleware para realizar bloqueio caso usuario não esteja logado

export const Routes = Router();

Routes.get('/', index);

// Rotas de Login
Routes.get('/login', login.index);
Routes.post('/login/login', login.login)
Routes.post("/login/register", login.register);
Routes.get("/login/logout", login.logout);


// Rotas de Contatos
Routes.get('/contato', loginRequired, contato.index);
Routes.post('/contato/register', contato.register);
Routes.get('/contato/:id', contato.editIndex);
Routes.post('/contato/edit/:id', contato.edit);
Routes.get('/contato/delete/:id', loginRequired, contato.delete)

