var mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs');
	var passportLocalMongoose = require('passport-local-mongoose');

	var Item = new mongoose.Schema({
		name: String,
		quantity: 0,
		checked: false
	});
	// my schema goes here!
	
	var List = new mongoose.Schema({
		name: String,
		createdBy: String ,
		items: [Item]
	});
	var User = new mongoose.Schema({
		images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
		lists:[]
	});
	var Image = new mongoose.Schema({
		user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
		url: {type:String, required: true},
	});
	var Forum = new mongoose.Schema({
		name: String,
		createdBy: String,
		date: Date,
		text: String,
	});

	User.plugin(passportLocalMongoose);

	List.plugin(URLSlugs('name'));
	Forum.plugin(URLSlugs('name'));
	mongoose.model('User', User);
	mongoose.model('Image', Image);
	mongoose.model('Forum', Forum);
	mongoose.model('List', List);
	mongoose.model('Item', Item);
	mongoose.connect('mongodb://localhost/finaldb');
