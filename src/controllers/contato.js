import ContatoMod from "../models/ContatoModel.js";

export const contato = {
    // Controller para rota index de contatos
    index: function (req, res) {
        // Este comenterio seria uma opção para o usuario não conseguir adicionar contatos na lista.
        // if(req.session.user){
        //     return res.render('contato')
        // }
        // return res.render("login")
        
        // Renderiza a pagina de contato
        res.render('contato', {
            contato: {} // este objeto vazio serve para não existir erro no momento que chamar a index do contato
        });
    },
    // Controller para criar contatos - POST
    register: async function (req, res) {
        try {

            const contato = new ContatoMod(req.body);
            await contato.registrar();

            if (contato.erros.length > 0) {
                req.flash('erros', contato.erros);
                req.session.save(() => res.redirect('/contato')); //salva sessão e redireciona para pagina de criação de contatos
                return;
            }
            req.flash('success', 'Contato registrado com sucesso'); // Envia mensagem de sucesso temporaria
            req.session.save(() => res.redirect(`/contato/${contato.user._id}`)); // salva a session e redireciona para a rota de edição de contatos
            return;
        } catch (error) {
            console.log(error);
            return res.render('404');
        }
    },

    // Controller para obter a informação de contatos e enviar para o front - GET
    editIndex: async function (req, res) {
        try{
            if (!req.params.id) {
                return res.render('404');
            }
            const user = await ContatoMod.prototype.buscarId(req.params.id); // Chama uma função do model para procurar um Id
            if (!user) return res.render('404'); // retorna 404 caso não haja user referente ao id
            res.render('contato', { contato: user }) // Retornas as informações do DB para o front 
        }catch(error){
            console.log(error);
            return res.render('404');
        }
    },
    // Controller para editar contatos - POST
    edit: async function (req, res) {
        try {
            if (!req.params.id) {
                return res.render('404');
            }
            // Fazendo instancia de um model de contato
            const contato = new ContatoMod(req.body); 
            // Editando usuario
            await contato.editar(req.params.id);
            // Verifica se existe erros,Atualizar a session e envia uma mensagem temporaria
            if (contato.erros.length > 0) {
                req.flash('erros', contato.erros);
                req.session.save(() => res.redirect('/contato'));
                return;
            }
            req.flash('success', 'Contato editado com sucesso'); 
            req.session.save(() => res.redirect(`/contato/${contato.user._id}`)); // redireciona a rota e salva a session  
            return;

        } catch (error) {
            console.log(error);
            res.render('404');
        }
    },

    // Controller para deletar contatos - GET
    delete: async function (req, res) {
        if (!req.params.id) return res.render('404'); // Retorna a pagina 404 caso não tenha nenhum params.id
        const contato = await ContatoMod.prototype.deletar(req.params.id); // Espera a classe chamar e concluir o delete com o id do req.parms
        if (!contato) return res.render('404'); // retorna 404 caso não tenha encontrado nenhum id referente.
        req.flash('success', 'Contato deletado com sucesso.'); 

        req.session.save(() => res.redirect('/')); // salva sessão e redireciona para a index do projeto
        return;
    }
}