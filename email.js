var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '365tojapan@gmail.com',
    pass: 'jgulvuhuebvdcseg'
  }
});


exports.subscriberMailer = async function subscriberMailer(req) {

    var mailOptions = {
        from: '365@gmail.com',
        to: 'tarun.eswar15@gmail.com',
        subject: 'New subscriber!',
    text: req.name + ' has subscribed to the mailing list! \nEmail: ' + req.email
      };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    });

}

exports.contactMailer = async function contactMailer (req) {

  var mailOptions = {
      from: '365@gmail.com',
      to: 'tarun.eswar15@gmail.com',
      subject: '365 Message - ' + req.subject,
      text: 'Name:' + req.name + '\nEmail' + req.email + '\n\nMessage: ' + req.message
    };

  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
      console.log(error);
  } else {
      console.log('Email sent: ' + info.response);
  }
  });

}
