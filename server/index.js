const express = require("express");
const PORT = 2948;
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const friendRoutes = require("./routes/Friendroutes");
const chatroutes = require("./routes/Chatroutes");
const postroutes = require("./routes/Postroutes");
const noteroutes = require("./routes/Noteroutes");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
  console.log(err.message, err.name);
  process.exit(1);
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.set("trust proxy", 1);
app.use(
  session({
    secret: "secretcode1",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60, // One Hour
    },
  })
);

app.use("/public/files", express.static(path.join(__dirname, "/public/files")));

app.use(passport.initialize());
app.use(passport.session());
app.use("/user", userRoutes);
app.use("/friend", friendRoutes);
app.use("/chat", chatroutes);
app.use("/post", postroutes);
app.use("/note", noteroutes);

// app.get('/', (req,res) => res.send("<h1>HELLO</h1>"))

// ${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}
try {
  mongoose.connect(
    `mongodb+srv://Armaan:key8493@arishka.ebvvb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    () => {
      console.log(`Connected to the DATABASE`);
    }
  );
} catch (error) {
  console.log(`Could not connect to the DB because ${error}`);
}

app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}`);
});

// everything below i just used for updating existing documents in order to add more functionality

// User.updateMany(
//   { posts: { $exists: false } },
//   { posts: [] },
//   { multi: true },
//   function (err, docs) {
//     if (err) console.log(err);
//     else console.log(docs);
//   }
// );
