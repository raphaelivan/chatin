exports.notFound = function (req, res, next) {
  res.status(404);
  res.render('not-found');
};

exports.errorHandler = function (err, req, res, next) {
  res.status(500);
  res.render('error', { error: err } );
};
