/*global module: false, require:false, __dirname:false*/

var db = require(__dirname + '/../../models')

module.exports = function(req, res) {
  if (!!req.session.userId) {
    var errors = {}

    db.User.find(req.session.userId).success(function(user) {
      db.Plant
        .find({ where: { macAddress: req.body.macAddress } })
        .success(function(plant) {
          if (!plant) {
            errors.macAddress = [ 'Not found!' ]
          } else if (plant.UserId) {
            errors.macAddress = [ 'Already assigned!' ]
          }

          if (errors && (Object.keys(errors).length > 0)) {
            res.render('plants/add', {
              title:  'water.me',
              user:   user,
              errors: errors,
              values: req.body
            })
          } else {
            plant.setUser(user).success(function() {
              res.redirect('/')
            })
          }
        })
    })
  } else {
    res.redirect('/')
  }
}
