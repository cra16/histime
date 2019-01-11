var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send()
});

router.get('/:id', function (req, res, next) {
  var id = parseInt(req.params.id, 10)
  var movie = movies.filter(function (movie) {
    return movie.id === id
  });
  
});

module.exports = router;