
/*
 * GET home page.
 */

exports.index = function(req, res) {
  console.log(req.params, req.query)
  res.render('index', { title: 'Express' });
};
