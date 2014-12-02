var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var List = mongoose.model('List');
var Item = mongoose.model('Item');
var passport = require('passport');
var User = mongoose.model('User');
var Image = mongoose.model('Image');
/* GET home page. */
router.get('/', function(req, res) {
	console.log(req.body);
  res.render('index', { title: 'Nutrition HomePage' });
});
router.get('/forums', function(req, res) {
	console.log(req.body);
  res.render('lists', { title: 'Forums', lists : Lists});
});
router.get('/list', function(req, res) {
	console.log(req.body);
  List.find(function(err, list, count) {
		res.render( 'list', {
			list: list
		});
	});
});
router.get('/user/create', function(req, res) {
	console.log(req.body);
  res.render('create', { title: 'Create a New List', name : null});
});
router.post('/user/create', function(req, res){
	console.log(req.body);
	new List({
		name : req.body.name,
		createdBy: null,
		items: []
	}).save(function(err, list, count){
		res.redirect('/list/'+list.slug);
	});
});
router.get('/list/:slug', function(req, res) {
	console.log(req.body);
  List.findOne({slug: req.params.slug}, function(err, list, count) {
	res.render('lists', { title: list.name, slug : list.slug, item : list.items, counter : 0});
});
});
router.post('/item/create', function(req, res){
	console.log(req.body);
	 List.findOne({slug: req.body.slug }, function(err, list, count) {
	new Item({
			name : req.body.name,
			quantity: req.body.quantity,
			slug: req.body.slug,
			checked: false
		}).save(function(err, item, count){
		  	list.items.push(item);
		list.save(function(err, list, count){
		res.redirect('/list/'+list.slug);
		});
	});
});
});
router.post('/item/check', function(req, res){
	console.log(req.body);
	 List.findOne({slug: req.body.slug }, function(err, list, count) {
	 	if(typeof(req.body.check) === 'undefined')
	 		res.redirect('/list/'+list.slug);
	 	else{
			for(var i =0; i < req.body.check.length; i++){
				var checker = req.body.check[i];
				list.items[checker].checked = true;

			};
		list.save(function(err, list, count){
		res.redirect('/list/'+list.slug);
		});
	};
	});
});
router.get('/login', function(req, res) {
res.render('login');
});
router.post('/login', function(req,res,next) {
// NOTE: use the custom version of authenticate so that we can
// react to the authentication result... and so that we can
// propagate an error back to the frontend without using flash
// messages
passport.authenticate('local', function(err,user) {
if(user) {
// NOTE: using this version of authenticate requires us to
// call login manually
req.logIn(user, function(err) {
res.redirect('/users/' + user.username);
});
} else {
res.render('login', {message:'Your login or password is incorrect.'});
}
})(req, res, next);
// NOTE: notice that this form of authenticate returns a function that
// we call immediately! See custom callback section of docs:
// http://passportjs.org/guide/authenticate/
});
router.get('/register', function(req, res) {
res.render('register');
});
router.post('/register', function(req, res) {
User.register(new User({username:req.body.username}),
req.body.password, function(err, user){
if (err) {
// NOTE: error? send message back to registration...
res.render('register',{message:'Your username or password is already taken'});
} else {
// NOTE: once you've registered, you should be logged in automatically
// ...so call authenticate if there's no error
passport.authenticate('local')(req, res, function() {
res.redirect('/users/' + req.user.username);
});
}
});
});
router.get('/users/:username', function(req, res) {
// NOTE: use populate() to retrieve related documents and
// embed them.... notice the call to exec, which executes
// the query:
// - http://mongoosejs.com/docs/api.html#query_Query-populate
// - http://mongoosejs.com/docs/api.html#query_Query-exec
User
.findOne({username: req.params.username})
.populate('images').exec(function(err, user) {
// NOTE: this allows us to conditionally show a form based
// on whether or not they're on "their page" and if they're
// logged in:
//
// - is req.user populated (yes means they're logged in and we
// have a user
// - is the authenticated user the same as the user that we
// retireved by looking at the slug?
var showForm = !!req.user && req.user.username == user.username;
res.render('user', {
showForm: showForm,
images: user.images,
username: user.username
});
});
});
router.post('/image/create', function(req, res) {
// NOTE: we're grabbing the _id from request.user
// and saving it into the image object
var img = new Image({
url: req.body.url,
user: req.user._id
});
img.save(function(err, savedImage, count) {
// NOTE: we're grabbing the image id from the
// saved image to add to the user's image array
req.user.images.push(savedImage._id);
req.user.save(function(err, savedUser, count) {
res.redirect('/users/' + req.user.username);
});
});
});

module.exports = router;
