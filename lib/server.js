/*global require:false, process:false, __dirname:false, module:false*/

var express        = require('express')
  , path           = require('path')
  , app            = express()
  , db             = require('../models')
  , SequelizeStore = require('connect-session-sequelize')(express)

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/../views')
app.set('view engine', 'jade')
app.use(express.favicon())
app.use(express.logger('dev'))
app.use(express.bodyParser())
app.use(express.methodOverride())
app.use(express.cookieParser())
app.use(express.session({
  store:  new SequelizeStore({ db: db.sequelize }),
  secret: process.env.SESSION_KEY || 'test1234'
}))
app.use(app.router)
app.use(express.static(path.join(__dirname, '..', 'public')))

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler())
}

module.exports = app
