import validator from "validator";

export default class Contato {
    constructor(form){
        this.form = document.querySelector(form);
    }

    init(){
        this.validate(this.form);
    }


    validate(el){
        
        const nome = document.querySelector('input[name=nome]');
        const email = document.querySelector('input[name=email]');
        const telefone = document.querySelector('input[name=telefone]');
        let erro = false;
        el.addEventListener('submit', (e) => {
            e.preventDefault();
            if(nome.value.lenght > 0){
                alert("O Contato necessita de um nome!");
                erro = true;
            }
            if(!validator.isEmail(email.value)){
                alert("Email invalido!");
                erro = true
            }
            if(email.value < 1 || telefone.value < 1){
                alert("Digite pelo menos uma referencia(Nome) para o contato!");
                erro = true;
            }

            if(!erro) el.submit();

        })
    }
}