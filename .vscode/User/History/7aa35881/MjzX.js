import express from 'express'
import ejs from 'ejs'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import expressSession, { Cookie } from 'express-session'
import flash from 'connect-flash'
import dashboardController from './controllers/dashboard.js'
import newPostController from './controllers/newPost.js'
import multer from 'multer'
import homeController from './controllers/home.js'
import storePostController from './controllers/storePost.js'
import getPostController from './controllers/getPost.js'
import validateMiddleWare from './middleware/validationMiddleware.js'
import searchBox from './controllers/searchBox.js'
import newUserController from './controllers/newUser.js'
import storeUserController from './controllers/storeUser.js'
import loginController from './controllers/login.js'
import loginUserController from './controllers/loginUser.js'

import authMiddleware from './middleware/authMiddleware.js'
import redirectIfAuthenticatedMiddleware from './middleware/redirectIfAuthenticatedMiddleware.js'
import logoutController from './controllers/logout.js'



const app = express()
mongoose.connect('mongodb+srv://Tonysmile:iam.123.purple@cluster0.2jfa4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true })
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(fileUpload());
//app.use('/posts/store', validateMiddleWare)
app.use(cookieParser("secret_passcode"))
app.use(expressSession({
        key: 'user_sid',
        secret: 'secret_passcode',
        Cookie: {
                expires: 600000
        },
        resave: false,
        saveUninitialized: false
}));
app.use(flash());

global.loggedIn = null;

app.use("*", (req, res, next) => {
        loggedIn = req.session.userId;
        next()
});
app.get('/', homeController)
app.get('/post/:id', getPostController)
app.post('/posts/store', authMiddleware, storePostController)
app.get('/posts/new', authMiddleware, newPostController)
app.get('/search', searchBox)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);
app.get('/dashboard', dashboardController)
app.get('/auth/logout', logoutController);
app.use((req, res) => res.render('notfound'));

let port = process.env.PORT;
if (port == null || port == "") {
        port = 4000
}
app.listen(port, () => {
        console.log('App listening......')
});