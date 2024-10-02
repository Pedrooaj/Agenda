import mongoose from "mongoose";
import validator from "validator";

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }
})

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class ContatoMod {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.user = null;
    }

    // Limpa as chaves do body caso não seja string
    cleanUp() {
        for (const key in this.body) {
            typeof this.body[key] !== 'string' ? this.body[key] = "" : this.body[key];
        }
        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone
        };

    }







    // Método para criar contato
    async registrar() {
        this.validar();
        if (this.erros.length > 0) return;
        this.user = await ContatoModel.create(this.body);
    }




    // Método para editar contato
    async editar(id) {
        if (typeof id !== 'string') return;
        this.validar();
        if (this.erros.length > 0) return;
        this.user = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    // Função para validar
    async validar() {
        this.cleanUp();
        // Verifica email
        if (this.body.email && !validator.isEmail(this.body.email)) {
            this.erros.push("Email invalido");
        }
        if (!this.body.nome) {
            this.erros.push("Nome é um campo obrigatorio!");
        }
        if (!this.body.telefone && !this.body.email) {
            this.erros.push("Pelo Menos um contato precisa ser enviado: E-Mail ou Telefone");
        }

    }

    // Métodos que serão acessados pela classe via classe.prototype.fn

    // Método para buscar id
    
    async buscarId(id) {
        if (typeof id != 'string') return;
        const user = await ContatoModel.findById(id);
        return user;
    }

    // Método para buscar contato

    async buscarContato() {
        const users = await ContatoModel.find().sort({
            criadoEm: -1
        });
        return users;
    }
}

export default ContatoMod