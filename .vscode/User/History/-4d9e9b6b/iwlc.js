import BlogPost from '../models/BlogPost.js'


export default  async (req, res) => {
    const blogposts = await BlogPost.find({}).populate('userid');
    console.log(req.session);

    res.render("index", {
            blogposts
            
    });
} 