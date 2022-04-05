export default (req,res) =>{
    var username = ""
    var email = ""
    var password = ""

    const data = req.flash('data')[0];

    if(typeof data != "undefined"){
        username = data.username,
        email = data.email,
        password = data.password
        
    }
    //let errors = {error: req.session.validationErrors};
    res.render('register',{
        errors:req.flash('validationErrors'),
        username: username,
        email: email,
        password : password 
        
    })
}