export const checkCsrfError = (err, req, res, next) => {
    
    // Verifica se há erros de Csrf e renderiza a pagina 404
    if (err) {
        console.log(err);
        return res.render('404');
    }
    next(); // usado para continuar a executar os middlewares e aplicação
}

// Middleware global para enviar mensagens para o front-end
export const middleWareGlobal = (req, res, next) => {
    res.locals.erros = req.flash("erros"); // faz a criação local de mensagens temporarias do tipo erros
    res.locals.success = req.flash("success"); //faz a criação local de mensagens temporarias de tipo success
    res.locals.user = req.session.user; // faz o registro local da session do usuario logado
    
    next(); // usado para continuar a executar os middlewares e aplicação
}

// Gera token CSRF global caso tenha um post para ser enviado
export const generateCsrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken(); // função responsavel por gerar e armazenar o token csrf localmente
    next(); // usado para continuar a executar os middlewares e aplicação
}

// Middleware que bloqueia acesso em rotas especificas caso usuario não esteja logado
export const loginRequired = (req,res,next) => {
    if(!req.session.user){
        req.flash('erros', 'Você precisa efetuar login!'); // retorna mensagem temporaria caso o usuario não esteja logado!
        req.session.save(() => res.redirect('/login')); // redireciona para login
        return
    }
    next(); // usado para continuar a executar os middlewares e aplicação
}