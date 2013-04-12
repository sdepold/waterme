/*global module: false, require:false, __dirname:false*/

module.exports = function(req, res) {
  if (!!req.session.userId) {
    res.redirect('/plants')
  } else {
    res.render('sessions/new', {
      title:  'water.me',
      user:   null,
      errors: {},
      values: {}
    })
  }
}
