const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const usersRouter = express.Router();

const {
	createUser,
    getUserById,
    getUserByEmail,
    deleteUser,
    updateUserInfo,
    updatePassword
} = require('../db/users');

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");
    next(); 
});

usersRouter.post('/register', async (req, res, next) => {
	const {email, password} = req.body;
	try {
		if(!email.includes('@') || !email.includes('.') || !email.length < 6) {
			return res.status(400).send({
				message: "Please enter a legitimate email address."
			})
		}
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

		const token = jwt.sign(
			{
				id: user.id,
				name: user.name,
			}, JWT_SECRET, {
				expiresIn: '1w'
			}
		);
		const finalReturn = {
			message: "Thank you for registering.",
			token: token,
			user: token.name
		};
		res.send(JSON.stringify(finalReturn));
	} catch(error) {
		next(error);
	} 
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
			}, JWT_SECRET, {
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
		};
	} catch(error) {
		next(errror);
	}
});

usersRouter.get('/profile', async (req, res, next) => {
	try {
		const token = req.headers.authorization.slice(7, req.headers.authorization.length);
		const decoded = jwt.verify(token, JWT_SECRET);
		const name = {name: decoded.name};
		res.send(JSON.stringify(name));
	} catch(error) {
		next(error);
	}
});

usersRouter.patch('/:userId/info', async (req, res, next) => {
	try {
		const {id} = req.params;
		const updated = updateUserInfo(id,	req.body);
		res.send(updated);
	} catch(error) {
		next(error);
	}
});

usersRouter.patch('/:userId/password', async (req, res, next) => {
	try {
		const {id} = req.params
		const {password, newPassword} = req.body;
		const user = await getUserById(id);
		const isCorrectPassword = await bcrypt.compare( password, user.password);

		if(isCorrectPassword) {
			const updated = updatePassword(id, newPassword)
		}
	} catch(error) {
		next(error);
	}
});

usersRouter.delete('/:userId', async (req, res, next) => {
	const {userId} = req.params;

	try{
		const deletedUser = await deleteUser(userId);
		res.send(deletedUser);
	} catch(error) {
		next(error);
	};

});

module.exports = usersRouter;