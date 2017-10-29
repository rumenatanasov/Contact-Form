let express = require('express');
const fs = require('fs')
let nodemailer = require("nodemailer");
let app = express();
let email = 'atanasovrumen123@gmail.com'
let smtpTransport
let file = fs.readFile('email-config.json', 'utf8', (err, content) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(content)
    let json = JSON.parse(content)
    smtpTransport = nodemailer.createTransport({
        service: json.service,
        host: json.host,
        auth: json.auth
    });

})


app.get('/about', function (req, res) {
    res.sendfile('index.html');
});
app.get('/send', function (req, res) {
    var mailOptions = {
        to: email,
        subject: req.query.subject,
        text: req.query.text + '\n' + req.query.to
    }
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});
app.get('/', (req, res) => {
    res.sendfile('about.html')
})
app.listen(3000, function () {
    console.log("Express Started on Port 3000");
});