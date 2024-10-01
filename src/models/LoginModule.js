import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const loginModel = mongoose.model('login', LoginSchema);

class LoginMod {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.user = null;
    }
    // Função para validar
    async validar() {
        this.cleanUp();
        // Verifica email
        if (!validator.isEmail(this.body.email)) {
            this.erros.push("Email invalido")
        }
        // Verifica senha
        if (this.body.password.length < 3 || this.body.password.length >= 50) {
            this.erros.push("A senha precisa ter entre 3 e 50 caracteres.");
        }
        // Executa uma função que procura se o usuario ja existe no DB
        await this.userExists();

    }

    async userExists() {
        // procura o item no DB
        const user = await loginModel.findOne({
            email: this.body.email
        });
        // Aplica o erro no array de erros...
        if (user) this.erros.push("Usuario Já existe!");
    }



    async register() {
        await this.validar();
        
        if (this.erros.length > 0) return;
        
        // cria um hash para a senha    
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        try {
            this.user = await loginModel.create(this.body);
        } catch (erro) {
            console.log(erro);
        }
    }

    cleanUp() {
        for (const key in this.body) {
            typeof this.body[key] !== 'string' ? this.body[key] = "" : this.body[key];
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }
}

export default LoginMod;