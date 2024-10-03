import core from "core-js";
import regeneratorRuntime from "regenerator-runtime";
import Login from "./modules/Login.js";
import Contato from "./modules/Contato.js";

const cadastro = new Login('.form-cadastro');
const login = new Login('.form-login');
login.init();
cadastro.init();

const contato = new Contato('.form-contato');
contato.init();


