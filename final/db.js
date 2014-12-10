var mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs');
	var passportLocalMongoose = require('passport-local-mongoose');


	var Listing = new mongoose.Schema({
		image: {type:String, required: true},
		createdBy: String ,
		address: String,
		user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
		price : Number,
		comments: [Forum]
	});
	var User = new mongoose.Schema({
		images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
		listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }]
	});
	var Image = new mongoose.Schema({
		user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
		url: {type:String, required: true}
	});
	var Forum = new mongoose.Schema({
		date: Date,
		text: String,
		listing: String
	});

	User.plugin(passportLocalMongoose);

	Listing.plugin(URLSlugs('address'));
	mongoose.model('User', User);
	mongoose.model('Image', Image);
	mongoose.model('Forum', Forum);
	mongoose.model('Listing', Listing);
	mongoose.connect('mongodb://localhost/finaldb');
