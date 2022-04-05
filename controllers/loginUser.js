import bcrypt from 'bcryptjs'
import User from '../models/User.js'

export default async (req, res) => {
    {
        const username = req.body.username, password = req.body.password;
        try {
            let hasError = false;
            var user = await User.findOne({ username: username }).exec();
            if (!user) {
                hasError = true
            }
            if(user){ 
            user.comparePassword(password, (match) => {
                if (!match) {
                    hasError = true
                }
            });
        }


            if(hasError){
                req.flash('loginError', 'Invalid Username or Password')
                return res.redirect('/auth/login')
            }

            req.session.userId = user._id
            res.redirect('/dashboard')

        } catch (error) {
            console.log(error);
        }
    }
}
