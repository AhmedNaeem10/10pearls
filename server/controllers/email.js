const nodemailer = require('nodemailer');
const { google } = require("googleapis");
require("dotenv").config({ path: "../config.env" });

function sendEmail(receiver, subject, text){
  const OAuth2 = google.auth.OAuth2;

  const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENTID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN
});
const access_token = oauth2Client.getAccessToken()

  
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.email,
          pass: process.env.emailpass,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          accessToken: access_token,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
      });

      
      var mailOptions = {
        from: process.env.email,
        to: receiver,
        subject: subject,
        text: text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log("Couldn't send email");
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = {sendEmail};


