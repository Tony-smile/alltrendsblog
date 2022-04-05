export default (req, res) => {
    let loginError = "" 


    loginError = req.flash('loginError')[0]
    
    res.render('login', {
        loginError: loginError,
    })
}