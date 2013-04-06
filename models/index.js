/*global global:false, require:false, process:false, __dirname:false, module:false*/

if (!global.hasOwnProperty('db')) {
  var Sequelize = require('sequelize')
    , sequelize = null

  if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
    // the application is executed on Heroku ... use the postgres database
    var match = process.env.HEROKU_POSTGRESQL_BRONZE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

    sequelize = new Sequelize(match[5], match[1], match[2], {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  true //false
    })
  } else {
    // the application is executed on the local machine ... use mysql
    sequelize = new Sequelize('example-app-db', 'root', null)
  }

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User:      sequelize.import(__dirname + '/user'),
    Plant:     sequelize.import(__dirname + '/plant'),
    Record:    sequelize.import(__dirname + '/record')
  }

  global.db.User.hasMany(global.db.Plant)
  global.db.Plant.belongsTo(global.db.User)
  global.db.Plant.hasMany(global.db.Record)
  global.db.Record.belongsTo(global.db.Plant)
}

module.exports = global.db
