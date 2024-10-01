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
        this.user = await loginModel.findOne({
            email: this.body.email
        });
        // Aplica o erro no array de erros...
        if (this.user) this.erros.push("Usuario Já existe!");
    }

    async login() {
        // Verifica se há erros
        if (this.erros.length > 0) return;
        // Busca no DB o usuario
        this.user = await loginModel.findOne({ email: this.body.email });

        if (!this.user) {
            this.erros.push('Usuário não existe.');
            return;
        }
        // faz a comparação de hash
        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.erros.push('Senha inválida!');
            this.user = null;
            return;
        }
    }



    async register() {
        await this.validar();

        if (this.erros.length > 0) return;

        // cria um hash para a senha    
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        // Cria o usuario no DB
        this.user = await loginModel.create(this.body);

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