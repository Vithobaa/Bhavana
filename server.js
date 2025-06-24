const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname))); // serve static files like CSS, JS

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bhavu985@gmail.com',       // your email
      pass: 'geuz xoif eosb ptxu',   
    },
  });

  const mailOptions = {
    from: 'bhavu985@gmail.com',    
    to: 'bhavu985@gmail.com',
    subject: `New message from ${name} via Portfolio`,
    text: `Message: ${message}\nFrom: ${email}`,
    replyTo: email,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send('Error sending email: ' + error.message);
    }
    res.send('Email sent successfully!');
  });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
