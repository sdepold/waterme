
/*
 * GET home page.
 */

exports.index = function(req, res) {
  console.log(req.params)
  res.render('index', { title: 'Express' });
};
