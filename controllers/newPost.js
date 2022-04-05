export default (req, res) => {
  //console.log(req.session
  if (req.session.userId) {
    let title = ""
    let body = ""
    const data = req.flash('data')[0];

    if (typeof data != "undefined") {
      title = data.title
      body = data.body
    }
    let validationErrors = req.flash('validationErrors')
    console.log('ValidationErrors :' + validationErrors);
    return res.render('create', {
      createPost : true,
      errors: validationErrors,
      title: title,
      body: body,
    }
    )
  }
  res.redirect('/auth/login')
}
