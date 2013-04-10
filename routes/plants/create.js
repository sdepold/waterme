/*global module: false, require:false, __dirname:false*/

var db = require(__dirname + '/../../models')

module.exports = function(req, res) {
  var value = req.body.value[0]
    , id    = req.body.value[1]
    , mac   = req.body.value[2]

  db.Plant.findOrCreate({
    identifier: id,
    macAddress: mac
  }).success(function(plant) {
    db.Record.create({
      value: value
    }).success(function(record) {
      plant.addRecord(record).success(function() {
        res.send('ok\n')
      })
    })
  })
}
