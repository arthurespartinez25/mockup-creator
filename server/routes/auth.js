let jwt = require('jsonwebtoken');
let secret = "mockup";

// creates token
module.exports.createAccesToken = (user) => {
	const data = {
		id: user.userID
	}
	console.log(data)

	return jwt.sign(data, secret, {});
}
// Verify token
module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization

	if(typeof token !== "undefined"){
		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (error, data) => {
			if(error){
				return res.send({auth: "failed"})
			} else {
				next();
			}
		})
	} else {
		return res.send("You have to log in")
	}
}
//decode token
module.exports.decode = (token) => {

	if(typeof token !== "undefined"){
		token = token.slice(7, token.length);

		return jwt.decode(token, {complete: true}).payload
	}
}
