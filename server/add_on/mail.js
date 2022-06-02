const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "armaanj82@gmail.com",
    pass: "Ab1234@@@",
  },
});

function mail(mailto, usrnm) {
  var mailOptions = {
    from: "armaanj82@gmail.com",
    to: mailto,
    subject: "Welcome to <OUR CHAT APP>",
    html:
      "<body style='background-color: black; text-align: center; color: white; font-family: Arial, Helvetica, sans-serif; height:100vh'> <h1>Welcome To Our Chat App</h1> <h3>" +
      usrnm +
      "</h3> <p>Listen * Share * Like</p> </body>",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info);
    }
  });
}

function otpmail(mailto, usrnm, otp) {
  var mailOptions = {
    from: "armaanj82@gmail.com",
    to: mailto,
    subject: "Welcome to <Our Chat App>",
    html:
      "<body style='background-color: black; text-align: center; color: white; font-family: Arial, Helvetica, sans-serif; height:100vh'> <h1 style='color:tomato; font-size: 4rem;'>CHOIR</h1> <h3 style='color:#f6d365; font-size: 2rem;'> Dear " +
      usrnm +
      " Someone is trying to logIn to your account. If It is you, use :</h3> <h1 style='color:red; padding:1rem'>" +
      otp +
      "</h1> <h3>to login to your account</h3> <h3 style='text-align: center'>Thanks</h3> <p style='text-align: center; color:blue'>Talk * Share</p> </body>",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info);
    }
  });
}

module.exports = { mail, otpmail };
