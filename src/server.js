import express from "express";
import { Routes } from "./routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import helmet from "helmet";
import csurf from "csurf";
import { checkCsrfError, generateCsrfToken } from "./middlewares/middleware.js";


// Configuração do dotenv
dotenv.config();

// Configuração do Express
const app = express();
app.use(express.urlencoded({ extended: true }));
const API_KEY = process.env.API_KEY;



// Conexão com o banco de dados MongoDB
mongoose.connect(API_KEY, {}).then(() => {
    app.emit("Pronto");
}).catch((err) => {
    console.log("Erro ao conectar ao banco de dados", err);
});





// Configuração das Views Express
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static("./public"));

// Configuração do Express Session com connect-flash e connect-mongo
const sessionOptions = session({
    secret: 'sla123',
    store: MongoStore.create({ mongoUrl: API_KEY }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());


// Middlewares adicional

app.use(csurf()); // Middleware CSRF
app.use(helmet()); // Middleware de segurança
app.use(generateCsrfToken);
app.use(checkCsrfError);
app.use(Routes); 








// Configuração do Express para receber dados de formulários e rotas
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(Routes);



app.on("Pronto", () => {
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000");
    });
});
