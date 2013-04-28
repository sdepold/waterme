/*global module:false, process:false, require:false, console:false*/

var nodemailer = require("nodemailer")

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Record', {
    value: DataTypes.FLOAT
  }, {
    instanceMethods: {
      afterCreate: function() {
        if (this.value < 30) {
          var smtpTransport = nodemailer.createTransport("SMTP", {
            service: "Gmail",
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASSWORD
            }
          })

          smtpTransport.sendMail({
            from: 'Water.me <'+process.env.MAIL_USER+'>',
            to:   process.env.MAIL_USER,
            subject: 'Out of water',
            text:    'Please water your plant! ' + this.value + '%'
          }, function(error, response) {
            if (error) {
              console.log(error)
            } else {
              console.log("Message sent: " + response.message);
            }

            smtpTransport.close()
          })
        }
      }
    }
  })
}
