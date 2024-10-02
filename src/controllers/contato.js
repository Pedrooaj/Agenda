import ContatoMod from "../models/ContatoModel.js";

export const contato = {
    index: function(req,res){
        // Este comenterio seria uma opção para o usuario não conseguir adicionar contatos na lista.
        // if(req.session.user){
        //     return res.render('contato')
        // }
        // return res.render("login")
        res.render('contato',{
            contato: {}
        });
    },
    register: async function(req,res){
        try {
            const contato = new ContatoMod(req.body);
        await contato.registrar();
        
        if(contato.erros.length > 0){
            req.flash('erros', contato.erros);
            req.session.save(() => res.redirect('/contato'));
            return;
        }
        req.flash('success', 'Contato registrado com sucesso');
        req.session.save(() => res.redirect(`/contato/${contato.user._id}`));
        return;
        } catch (error) {
            console.log(error);
            return res.render('404')
        }
    },
    edit: async function(req, res) {
        if(!req.params.id){
            return res.render('404');   
        } 

        const user = await ContatoMod.prototype.buscarId(req.params.id);

        if(!user) return res.render('404')

        res.render('contato', {
            contato: user
        })
    }
}