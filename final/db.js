var mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs');
	var passportLocalMongoose = require('passport-local-mongoose');


	var Listing = new mongoose.Schema({
		image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
		createdBy: String ,
		address: String
	});
	var User = new mongoose.Schema({
		images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
		listings:[Listing]
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

	Listing.plugin(URLSlugs('address'));
	mongoose.model('User', User);
	mongoose.model('Image', Image);
	mongoose.model('Forum', Forum);
	mongoose.model('Listing', Listing);
	mongoose.connect('mongodb://localhost/finaldb');
