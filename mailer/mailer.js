if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const nodemailer = require('nodemailer');
const express = require('express');
const errorHandler = require('../_helpers/error-handler');

const router = express.Router();

router.post('/', (req, res) => {
  sendEmail(req, res);
});

function sendEmail(req, res) {
  const mailSubject = 'Canorea Inquiry';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_USERNAME,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.NODEMAILER_USERNAME,
    to: 'jys2@sfu.ca',
    // to: req.body.to,
    subject: mailSubject,
    html: req.body.htmlString
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err)
      errorHandler(err, req, res);
    else
      res.send(info);
  });
}

module.exports = router;