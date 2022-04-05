import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please Provide Username'],
        unique: [true, 'Sorry Username already exist'],
      
    },
    email: {
        type: String,
        required: [true, 'Please Provide a valid email address'],
        unique : [true, 'Sorry Email address already exist'],
    
    },
    password: {
        type: String,
        required: [true, 'Please Provide Password']

    }
});
UserSchema.plugin(uniqueValidator);
UserSchema.pre('save', function (next) {
    if(!this.isModified("password")){
        return next()
    }
    this.password =bcrypt.hashSync(this.password, 10);
    next();
});
UserSchema.methods.comparePassword = function (plaintext, callback){
return callback(bcrypt.compareSync(plaintext, this.password));
}
const User = mongoose.model('User', UserSchema)
export default User;