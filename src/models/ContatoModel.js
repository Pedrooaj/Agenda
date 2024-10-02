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

     async registrar(){
        this.validar();
        if(this.erros.length > 0) return;
        this.user = await ContatoModel.create(this.body);
     }

     async buscarId(id){
        if(typeof id != 'string') return;
        const user = await ContatoModel.findById(id);
        return user;
     }

    // Função para validar
    async validar() {
        this.cleanUp();
        // Verifica email
        if (this.body.email && !validator.isEmail(this.body.email)) {
            this.erros.push("Email invalido");
        }
        if (!this.body.nome) {
            this.erros.push("Nome é um campo obrigatorio");
        }
        if (!this.body.telefone || !this.body.email) {
            this.erros.push("Pelo Menos um contato precisa ser enviado: E-Mail ou Telefone");
        }



    }
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
}

export default ContatoMod