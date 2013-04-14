/*global module: false, require:false, __dirname:false*/

var db = require(__dirname + '/../../models')

module.exports = function(req, res) {
  if (!!req.session.userId) {
    db.User.find(req.session.userId).success(function(user) {
      user.getPlants().success(function(plants) {
        var plant = plants.filter(function(p) { return p.id.toString() === req.params.id })

        if ((plant.length === 1) && (plant = plant[0])) {
          res.render('plants/edit', {
            title:  'water.me',
            user:   user,
            plant:  plant,
            values: plant.values,
            errors: {}
          })
        } else {
          res.redirect('/')
        }
      })
    })
  } else {
    res.redirect('/')
  }
}
