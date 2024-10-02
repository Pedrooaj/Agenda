export const checkCsrfError = (err, req, res, next) => {
    if (err) {
        console.log(err);
        return res.render('404')
    }
    next();
}

export const middleWareGlobal = (req, res, next) => {
    res.locals.erros = req.flash("erros");
    res.locals.success = req.flash("success");
    res.locals.user = req.session.user;
    
    next();
}

export const generateCsrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

export const loginRequired = (req,res,next) => {
    if(!req.session.user){
        req.flash('erros', 'Você precisa efetuar login!');
        req.session.save(() => res.redirect('/login'));
        return
    }
    next();
}