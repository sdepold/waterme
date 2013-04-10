/*global module: false, require:false, __dirname:false*/

var db = require(__dirname + '/../../models')

module.exports = function(req, res) {
  if (!!req.session.userId) {
    db.User.find(req.session.userId).success(function(user) {
      res.render('plants/add', {
        title:  'water.me',
        user:   user,
        values: {},
        errors: {}
      })
    })
  } else {
    res.redirect('/')
  }
}
