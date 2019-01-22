const config = require('../config/config.js');

const Role = require('../model/role.model.js');
const User = require('../model/user.model.js');
const Product = require('../model/userternak.model.js');
const UserFirst = require('../model/userfirst.js')

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
	// Save User to Database
	console.log("Processing func -> SignUp");

	const user = new User({
		name: req.body.name,
		username: req.body.username,
		avatar: req.body.avatar,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8)
	});

    // Save a User to the MongoDB
    user.save().then(savedUser => {
		Role.find({
				'name': { $in: req.body.roles.map(role => role.toUpperCase()) }
		}, (err, roles) => {
			if(err) 
				res.status(500).send("Error -> " + err);

			// update User with Roles
			savedUser.roles = roles.map(role => role._id);
			savedUser.save(function (err) {
				if (err) 
					res.status(500).send("Error -> " + err);

				res.send("User registered successfully!");
			});
		});
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    });
}

exports.signin = (req, res) => {
	console.log("Sign-In");

	User.findOne({ username: req.body.username })
	.exec((err, user) => {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "User not found with Username = " + req.body.username
				});                
			}
			return res.status(500).send({
				message: "Error retrieving User with Username = " + req.body.username
			});
		}
					
		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
		}
		
		var token = jwt.sign({ id: user._id }, config.secret, {
		  expiresIn: 86400 // expires in 24 hours
		});
		
		res.status(200).send({ auth: true, accessToken: token });
	});
}

exports.userContent = (req, res) => {
	User.findOne({ _id: req.userId })
	.select('-_id -__v -password')
	.populate('roles', '-_id -__v')
	.exec((err, user) => {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "User not found with _id = " + req.userId
				});                
			}
			return res.status(500).send({
				message: "Error retrieving User with _id = " + req.userId	
			});
		}
					
		res.status(200).json({
			"description": "User Content Page",
			"user": user
		});
	});
}

exports.userProducts = (req, res) => {
	Product.find(req.params, function(err, products){
        if(err) return next(err);
        res.send(products)
    })
}

exports.userLiat = (req, res) => {
	UserFirst.find(req.params, function(err, userliats){
		if(err) return next(err);
		res.send(userliats)
	})
};

exports.product_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.test = function (req, res) {
    
    res.send('Greetings from the Test controller!');
};

exports.product_create = function (req, res) {
	console.log('post')
    var product = new Product(
        {
            nama: req.body.nama,
            alamat: req.body.alamat,
            keterangan: req.body.keterangan,
            gambar: req.body.gambar,
            harga: req.body.harga
        }
    );
    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.user_firstcreate = function (req, res) {
	console.log('lagi ngepost cok, sabar')
	var userfistpost = new UserFirst(
		{
			namadepan: req.body.namadepan,
			namabelakang: req.body.namabelakang
		}
	);
	userfistpost.save(function (err){
		if (err) {
			return next(err);
		}
		res.send('suddaaaaah')
	})
};

exports.seorang_user = function (req, res) {
    UserFirst.findById(req.params.id, function (err, seoranguser) {
        if (err) return next(err);
        res.send(seoranguser);
    })
};

exports.adminBoard = (req, res) => {
	User.findOne({ _id: req.userId })
	.select('-_id -__v -password')
	.populate('roles', '-_id -__v')
	.exec((err, user) => {
		if (err){
			if(err.kind === 'ObjectId') {
				res.status(404).send({
					message: "User not found with _id = " + req.userId
				});                
				return;
			}

			res.status(500).json({
				"description": "Can not access Admin Board",
				"error": err
			});

			return;
		}
					
		res.status(200).json({
			"description": "Admin Board",
			"user": user
		});
	});
}

exports.managementBoard = (req, res) => {
	User.findOne({ _id: req.userId })
	.select('-_id -__v -password')
	.populate('roles', '-_id -__v')
	.exec((err, user) => {
		if (err){
			if(err.kind === 'ObjectId') {
				res.status(404).send({
					message: "User not found with _id = " + req.userId
				});                
				return;
			}

			res.status(500).json({
				"description": "Can not access PM Board",
				"error": err
			});

			return;
		}
					
		res.status(200).json({
			"description": "PM Board",	
			"user": user
		});
	});
}