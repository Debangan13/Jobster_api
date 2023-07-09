const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
require('dotenv')
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "please provide a name"],
		minlength: 3,
		maxlength: 50,
	},
	email: {
		type: String,
		required: [true, "please provide email"],
		match:
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		unique: true,
	},
	password: {
		type: String,
		required: [true, "please provide password"],
		minlength: 6,
	},
	lastName: {
		type: String,
		trim: true,
		maxlength: 20,
		default: 'lastName',
	  },
	  location: {
		type: String,
		trim: true,
		maxlength: 20,
		default: 'my city',
	  },
});

userSchema.pre("save", async function (next) {
	console.log(!this.modifiedPaths('password'))
	if (!this.isModified('password')) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt)
	next();
});

userSchema.methods.createJWT = function () {
	return jwt.sign({ userID: this._id, name: this.name }, process.env.JWT_SCERET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
};

userSchema.methods.comparePassword = async function(canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model("User", userSchema);
