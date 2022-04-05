import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import User from './User.js';


const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please, provide title']
    },
    body: {
        type: String,
        required: [true, 'Description is required']
    },
    userid :{
type: mongoose.Schema.Types.ObjectId,
ref: 'User',
required: true
    },
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: {
        type: String,
        required: [true, 'Please, import a Photo']
    }
});
BlogPostSchema.plugin(uniqueValidator)
BlogPostSchema.index({ '$**': 'text' })

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
export default BlogPost;