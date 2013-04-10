/*global module: false, require:false, __dirname:false*/

var db = require(__dirname + '/../../models')

module.exports = function(req, res) {
  if (!!req.session.userId) {
    res.redirectTo('/')
  } else {
    var errors = {}
      , user   = null

    if (req.body.password_once === req.body.password_again) {
      user = db.User.build({
        email:    req.body.email,
        password: req.body.password_once
      })

      errors = user.validate()
    } else {
      errors.password = [ 'Not equal!' ]
    }

    if (errors && (Object.keys(errors).length > 0)) {
      res.render('users/new', {
        title:  'water.me',
        user:   null,
        errors: errors,
        values: req.body
      })
    } else {
      user.save().success(function(_user) {
        req.session.userId = _user.id
        res.redirect('/')
      })
    }
  }
}
