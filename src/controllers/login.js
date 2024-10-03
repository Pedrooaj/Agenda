import LoginMod from "../models/LoginModel.js";

const login = {
  index: function (req, res) {
    if (req.session.user) {
      return res.render("logado"); // Renderiza a pagina de logado
    }
    return res.render('login'); // Renderiza a pagina de login/registro
  },
  register: async function (req, res) {
    try {
      // Criação de usuario com a classe login do Model 
      const Login = new LoginMod(req.body);
      await Login.register();

      // if para exibir erros com flash
      if (Login.erros.length > 0) {
        req.flash("erros", Login.erros); // Exibe erros do array de erros do model login
        req.session.save(() => res.redirect('/login')); // Função responsavel há redirecionar rotas e salvar session
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
  login: async function (req, res) {
    try {
      // Cria o objeto login
      const login = new LoginMod(req.body);

      await login.login(); // Chama a função login

      if (login.erros.length > 0) {
        req.flash('erros', login.erros);
        req.session.save(() => res.redirect("/login")); // Redireciona para login caso tenha erro
        return;
      }
      req.flash('success', 'Você entrou no sistema.'); // Envia mensagem de sucesso para o index
      req.session.user = login.user;  // salva a sessão 
      req.session.save(() => res.redirect("/login")); // Redireciona para o index 
    } catch (e) {
      console.log(e);
      return res.render('404'); // renderiza a pagina 404
    }
  },
  logout: function (req, res) {
    req.session.destroy(); // Serve para destruir a session encerrar/logout
    res.redirect("/login") // redireciona para rota login
  }

}

export default login;