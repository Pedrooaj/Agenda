import LoginMod from "../models/LoginModel.js";

const login = {
    index: function (req, res) {
        res.render('login')
    },
    register: async function (req, res) {
        try {
            // Criação de usuario com a classe login do Model 
            const Login = new LoginMod(req.body);
            await Login.register();

            // if para exibir erros com flash
            if (Login.erros.length > 0) {
                req.flash("erros", Login.erros);
                req.session.save(() => res.redirect('/login')); // Função responsavel há redirecionar rotas
                return;
            }
            // Efetua com sucesso a criação da conta e redireciona para pagina de login
            req.flash("success", "Registro efetuado com Sucesso");
            req.session.save(() => res.redirect("/login"));

        } catch (erro) {
            console.log(erro);
            return res.render('404');
        }
    },
    login: async function(req, res){
        try {
          // Cria o objeto login
            const login = new LoginMod(req.body);

            await login.login(); // Chama a função login
        
            if(login.erros.length > 0) {
              req.flash('erros', login.erros);
              req.session.save(() => res.redirect("/login")); // Redireciona para login caso tenha erro
              return;
            }
            req.flash('success', 'Você entrou no sistema.'); // Envia mensagem de sucesso para o index
            req.session.user = login.user;  // salva a sessão 
            req.session.save(() => res.redirect("/login")); // Redireciona para o index 
          } catch(e) {
            console.log(e);
            return res.render('404');
          }

    }

}

export default login;