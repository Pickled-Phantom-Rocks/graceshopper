const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const usersRouter = express.Router();

const {
	createUser,
    getUser,
    getUserById,
    getUserByEmail,
    getAllUsers,
    deleteUser,
    updateUserInfo,
    updatePassword
} = require('../db/users');

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");
    next(); 
  });

usersRouter.post('/register', async (req, res, next) => {
	const {email, password, name, address,billingInfo} = req.body;

	//add if check for email address format, looking for @

	if(password.length < 8) {
		return res.status(400).send({
			message: "Password must be at least eight characters long."
		});
	};
	const existingEmail = await getUserByEmail(email);
	if(typeof(existingUser) == 'object') {
		return res.status(400).send({
			message: "This email address is already associated with another account."
		})
	};
	const user = await createUser(req.body);

});

usersRouter.post('/login', async (req, res, next) => {
	const {email, password} = req.body;

	if(!email || !password) {
		next({
			name: "Missing Credentials",
			message: "You need both an email address and password to login."
		});
	};

	try {
		const user = await getUserByEmail(email);
		const isCorrectPassword = await bcrypt.compare( password, user.password);

		if(user && isCorrectPassword) {
			const token = jwt.sign({ 
				id: user.id,
				name: user.name
			}, 
			JWT_SECRET, {
				expiresIn: '1w'
			});
			res.send({
				message: "You have successfully logged in."
			})
		} else {
			next({
				name: "Invalid Credentials",
				message: "Email or password is incorrect."
			})
		}
	} catch(error) {
		next(errror);
	}
});

usersRouter.get('/profile', async (req, res, next) => {
	const token = req.headers.authorization.slice(7, req.headers.authorization.length)
	const decoded = jwt.verify(token, JWT_SECRET)
	const name = {name: decoded.name};
	res.send(JSON.stringify(name));

});


module.exports = usersRouter;