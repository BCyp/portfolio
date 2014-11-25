var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/aboutus', function(req, res) {
  res.render('aboutus', { title: 'Express' });
});
router.get('/forums', function(req, res) {
  res.render('forums', { title: 'Express' });
});
router.get('/login', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/profile', function(req, res) {
  res.render('profile', { title: 'Express' });
});
module.exports = router;
