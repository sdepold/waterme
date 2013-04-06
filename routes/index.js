/*global module: false, require:false, __dirname:false*/

var db = require(__dirname + '/../models')

module.exports = function(req, res) {
  db.User.find({
    where: { username: 'sdepold' }
  }).success(function(user) {
    db.Plant.findAll({
      where:   { UserId: user.id },
      include: [  db.Record ]
    }).success(function(plants) {
      res.render('index', {
        title:  'water.me',
        plants: plants
      })
    })
  })
}
