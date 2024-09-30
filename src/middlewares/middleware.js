export const checkCsrfError = (err, req, res, next) => {
    if (err) {
        res.render('404')
    }
    next();
}

export const generateCsrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}