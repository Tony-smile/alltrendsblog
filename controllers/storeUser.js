import User from '../models/User.js'
import path from 'path'
export default (req, res) => {
    var user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
user.save((error, details) => {
        if (error){
         console.log(error.errors)
   const validationErrors=   Object.keys(error.errors).map(key => error.errors[key].message)
   /*  console.log(validationErrors); */
           req.flash('validationErrors', validationErrors)
           req.flash('data', req.body)
          res.redirect('/auth/register')
            
        }else{ 
            console.log(details);
            req.session.user = details;
            res.redirect('/dashboard')
        }
        
    })
}