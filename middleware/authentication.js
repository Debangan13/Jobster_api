const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
	
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer")) {
		throw new UnauthenticatedError("Authentication invalid");
	}

	const token = authHeader.split(" ")[1];
	try {
		const payload = jwt.verify(token, process.env.JWT_SCERET);
		const testUser = payload.userID == '64a7bc656cb51b0b1c33d287'
		req.user = { userId: payload.userID,testUser };
		next();
		
	} catch (error) {
		throw new UnauthenticatedError("Authentication ");
	}
};

module.exports = auth;
