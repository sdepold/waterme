/*global require:false, console:false*/

var app  = require('./lib/server')
  , db   = require('./models')
  , http = require('http')

app.get('/',               require('./routes'))
app.get('/login',          require('./routes/sessions/new'))
app.post('/login',         require('./routes/sessions/create'))
app.get('/register',       require('./routes/users/new'))
app.post('/register',      require('./routes/users/create'))
app.get('/plants',         require('./routes/plants/index'))
app.post('/plants',        require('./routes/plants/create'))
app.get('/plants/add',     require('./routes/plants/add'))
app.post('/plants/assign', require('./routes/plants/assign'))
app.get('/plants/:id',     require('./routes/plants/show'))

db.sequelize.sync().complete(function(err) {
  if (err) {
    throw err
  } else {
    http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'))
    })
  }
})

