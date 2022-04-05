export default (req, res) =>{
    req.flash('Logout Successful')
    req.session.destroy(() =>{
        res.redirect('/')
    });
}