require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const tenetRoutes = require('./routes/tenet');

const PORT = process.env.port || 2948;

const app = express();

// process.on('uncaughtException', err => {
// 	console.log('UNCAUGHT EXCEPTION, APP SHUTTING NOW!!');
// 	console.log(err.message, err.name);
// 	process.exit(1);
// });

app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		secret: process.env.SESSION_SECRET_CODE,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false,
			maxAge: 1000 * 60 * 60, // One Hour
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/', tenetRoutes);

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USR}:${process.env.DB_PWD}@cluster0.vapat2n.mongodb.net/tenet?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		}
	)
	.then(result => {
		console.log('Connceted to Database');
		app.listen(PORT, () => {
			console.log(`Server started at Port: ${PORT}`);
		});
	})
	.catch(err => {
		console.log(`Could not connect to the DB because ${err}`);
	});
