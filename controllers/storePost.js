import BlogPost from '../models/BlogPost.js'
import path from 'path'
import { log } from 'console';

export default async (req, res) => {
        

        console.log('About to Upload');
        let imageFile = req.files?.image
        let imagePath = imageFile ? '/assets/img/' + imageFile.name : null
        const __dirname = path.resolve();
        
        await BlogPost.create({
                ...req.body,
                image: imagePath,
                userid: req.session.userId
        }, (error) => {
                if (error) {
                        const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);

                        
                        req.flash('validationErrors', validationErrors);
                        req.flash('data', req.body)
                        
                        return res.redirect('/posts/new')
 
                } else {
                        imageFile?.mv(__dirname + '/public/assets/img/' + imageFile.name, (error) => {
                                if (error) {
                                        console.log(error.errors);
                                }
                        })
                        return res.redirect('/')
                }
        })

}
