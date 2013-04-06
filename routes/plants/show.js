/*global module: false, require:false, __dirname:false*/

var db = require(__dirname + '/../../models')

module.exports = function(req, res) {
  db.Plant.find({
    where:   { id: req.params.id },
    include: [ db.Record ]
  }).success(function(plant) {
    res.render('plants/show', {
      title: 'water.me',
      plant: plant
    })
  })
}
