/*global require:false, console:false*/

var app    = require('./lib/server')
  , http   = require('http')
  , db     = require('./models')

app.get('/',           require('./routes'))
app.post('/',          require('./routes/plants/create'))
app.get('/plants/:id', require('./routes/plants/show'))

db.sequelize.sync().complete(function(err) {
  db.User.findOrCreate({ username: 'sdepold', 'email': 'sascha@depold.com' }).success(function() {
    if (err) {
      throw err
    } else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'))
      })
    }
  })
})

