/*global module: false, require:false, __dirname:false*/

var db = require(__dirname + '/../../models')

module.exports = function(req, res) {
  if (!!req.session.userId) {
    db.User.find(req.session.userId).success(function(user) {
      db.Plant.find(req.params.id).success(function(plant) {
        plant.getRecords({ order: 'id DESC', limit: 10 }).success(function(records) {
          plant.records = records

          res.render('plants/show', {
            title: 'water.me',
            plant: plant,
            user:  user
          })
        })
      })
    })
  } else {
    res.redirect('/')
  }
}
