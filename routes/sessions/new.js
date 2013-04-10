/*global module: false, require:false, __dirname:false*/

module.exports = function(req, res) {
  if (!!req.session.userId) {
    res.redirectTo('/plants')
  } else {
    res.render('sessions/new', {
      title:  'water.me',
      user:   null
    })
  }
}
