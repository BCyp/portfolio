var mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs');

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
		username: String,
		password: String,
		forumList: [Forum],
		height: String,
		weight: String,
		Goals: String,
		lists: [List],
	});
	var Forum = new mongoose.Schema({
		createdBy: User
		date: Date,
		text: String,
	});

	List.plugin(URLSlugs('name'));
	User.plugin(URLSlugs('username'));
	mongoose.model('User', User);
	mongoose.model('Forum', Forum);
	mongoose.model('List', List);
	mongoose.model('Item', Item);
	mongoose.connect('mongodb://localhost/finaldb');
