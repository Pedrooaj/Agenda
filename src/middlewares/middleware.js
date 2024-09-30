export const checkCsrfError = (err, req, res, next) => {
    if (err) {
        res.render('404')
    }
    next();
}

export const middleWareGlobal = (req, res, next) => {
    res.locals.erros = req.flash("erros");
    res.locals.success = req.flash("success");
    next();
}

export const generateCsrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}