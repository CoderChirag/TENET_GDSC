require('dotenv').config();
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const Googleuser = require('../models/googleuser');
const Registereduser = require('../models/registereduser');

passport.serializeUser((user, done) => {
	console.log('SERIALISING', user.id, user._id);
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	console.log('DESERIALISING', id);
	Googleuser.findById(id)
		.then(user => {
			done(null, user);
		})
		.catch(err => {
			done(err, null);
		});
});

passport.use(
	new googleStrategy(
		{
			callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
			clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
			clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
		},
		function (token, tokenSecret, profile, done) {
			console.log(profile);
			// done(null, { id: 1, _id: 1 });
			Googleuser.findOne({ email: profile._json.email })
				.then(currentUser => {
					if (currentUser) {
						console.log('Googleuser Already In DB');
						return currentUser;
					} else {
						// return done(null, false, {
						// 	message: 'You are not registered on Devfolio',
						// 	code: 101,
						// });
						// Checking if user is registered on devfolio
						return Registereduser.findOne({
							email: profile._json.email,
						});
						// new User({
						// 	username: profile._json.name,
						// 	email: profile._json.email,
						// 	img: profile._json.picture,
						// })
						// 	.save()
						// 	.then(newUser => {
						// 		console.log('NEW USER CREATED', newUser);
						// 		done(null, newUser);
						// 	});
					}
				})
				.then(user => {
					if (user && user.username) {
						// User already in db
						return user;
					} else if (user && !user.username) {
						// Creating new user
						return new Googleuser({
							username: profile._json.name,
							email: profile._json.email,
							img: profile._json.picture,
						}).save();
					} else {
						return null;
					}
				})
				.then(user => {
					if (!user) {
						return done(null, false, {
							message:
								'You are not registered on Devfolio with this email.',
							code: 401,
						});
					}
					console.log('Saving current user', user);
					return done(null, user);
				})
				.catch(err => {
					console.log(err);
				});
		}
	)
);
