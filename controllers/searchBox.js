import BlogPost from '../models/BlogPost.js'



export default async (req, res) => {
    const { resName } = req.query;
    const blogposts = await BlogPost.find({ $text: { $search: resName } })
    console.log(blogposts)

    //const blogposts = await BlogPost.find({title: resName})

    res.render('index', { blogposts })
}