/*global module: false, require:false, __dirname:false*/

var db = require(__dirname + '/../../models')

module.exports = function(req, res) {
  if (!!req.session.userId) {
    db.User.find(req.session.userId).success(function(user) {
      user.getPlants({ include: [ db.Record ] }).success(function(plants) {
        res.render('plants/index', {
          title:  'water.me',
          user:   user,
          plants: plants
        })
      })
    })
  } else {
    res.redirect('/')
  }
}
