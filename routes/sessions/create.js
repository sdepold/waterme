/*global module: false, require:false, __dirname:false*/

var db = require(__dirname + '/../../models')

module.exports = function(req, res) {
  if (!!req.session.userId) {
    res.redirect('/plants')
  } else {
    db.User.find({
      where: { email: req.body.email }
    }).success(function(user) {
      if (user.password === req.body.password) {
        req.session.userId = user.id
        res.redirect('/plants')
      } else {
        var errors = {
          password: [ 'Did not match!' ]
        }

        res.render('sessions/new', {
          title:  'water.me',
          user:   null,
          errors: errors,
          values: req.body
        })
      }
    })
  }
}
