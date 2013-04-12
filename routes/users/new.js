/*global module: false*/

module.exports = function(req, res) {
  if (!!req.session.userId) {
    res.redirect('/plants')
  } else {
    res.render('users/new', {
      title:  'water.me',
      user:   null,
      errors: {},
      values: {}
    })
  }
}
