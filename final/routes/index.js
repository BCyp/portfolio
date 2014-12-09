var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var Image = mongoose.model('Image');
var Listing = mongoose.model('Listing');
var Forum = mongoose.model('Forum');
/* GET home page. */
router.get('/', function(req, res) {
	console.log(req.body);
	if(req.user){
		res.redirect('/users/'+req.user.username);
	}
	else{
		res.render('index', { title: 'Sell & Tell: The World\'s Premier Online Art Auction' , message: 'Login to view your page'});
	}
});
router.get('/about', function(req,res){
	res.render('about');
});

router.get('/listings', function(req, res) {
  Listing.find(function(err, list, count) {
		res.render( 'list', {
			list: list
		});
	});
});
router.post('/listings/comment', function(req, res) {
  	var comment = new Forum({
		text: req.body.message,
		date: Date.now(),
		listing: req.body.listing
	});
 	comment.save(function(err, savedComment, count) {
    if (err) { return res.send(500, 'Error occurred: database error.'); }
    res.json({id:savedComment._id, text: savedComment.text});
    });
});
router.get('/listings/comment', function(req, res) {
  Forum.find(function(err, comments, count) {
    	res.json(comments.map(function(ele) {
      		return {
        		'comment': ele.text,
        	'date': ele.date,
        	'listing':ele.listing
      		}; 
    	}));
  	});
});
router.get('/login', function(req, res) {
res.render('login');
});
router.post('/login', function(req,res,next) {
	passport.authenticate('local', function(err,user) {
	if(user) {
		req.logIn(user, function(err) {
		res.redirect('/users/' + user.username);
	});
	} else {
		res.render('login', {message:'Your login or password is incorrect.'});
	}
	})(req, res, next);
});
router.get('/register', function(req, res) {
res.render('register');
});
router.post('/register', function(req, res) {
	User.register(new User({username:req.body.username}),
		req.body.password, function(err, user){
		if (err) {
			res.render('register',{message:'Your username or password is already taken'});
		} else {
			passport.authenticate('local')(req, res, function() {
				res.redirect('/users/' + req.user.username);
			});
		}
	});
});
router.get('/listings/:listName',function(req, res){
	var list = Listing.findOne({slug: req.params.listName},function(err, list, count){
	res.render('listing', {list:list});
	});
});

router.get('/users/:username', function(req, res) {
	User
	.findOne({username: req.params.username})
	.populate('images').populate('listings').exec(function(err, user) {
		var showForm = !!req.user && req.user.username == user.username;
		res.render('user', {
			showForm: showForm,
			images: user.images,
			username: user.username,
			listings:user.listings
		});
	});
});
router.post('/image/create', function(req, res) {
	var img = new Image({
		url: req.body.url,
		user: req.user._id
	});
	img.save(function(err, savedImage, count) {
		req.user.images.push(savedImage._id);

				new Listing({
					price : req.body.price,
					user: req.user._id,
					address: req.body.address,
					image: savedImage.url,
					createdBy: req.user.username
				}).save(function(err, list, count){
					req.user.listings.push(list._id);
					req.user.save(function(err, savedUser, count) {
			res.redirect('/users/' + req.user.username);
			});
		});
	});
});

module.exports = router;
