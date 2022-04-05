

// route for user's dashboard
export default (req, res) => {
   
    if (req.session.userId){
        console.log(req.session);
        res.render('dashboard')
    } else {
        res.redirect("/auth/login");
    }
}
