/*global module: false*/

module.exports = function(req, res) {
  if (!!req.session.userId) {
    res.redirectTo('/plants')
  } else {
    res.render('users/new', {
      title:  'water.me',
      user:   null,
      errors: {},
      values: {}
    })
  }
}
