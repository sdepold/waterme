/*global module: false, require:false, __dirname:false*/

var db = require(__dirname + '/../../models')

module.exports = function(req, res) {
  db.Plant.find(req.params.id).success(function(plant) {
    plant.getRecords({ order: 'id DESC' }).success(function(records) {
      plant.records = records

      res.render('plants/show', {
        title: 'water.me',
        plant: plant
      })
    })
  })
}
