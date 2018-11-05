const express = require('express');
const app = express();
const otplib = require('otplib');

const bodyParser = require('body-parser')


// create application/json parser
const jsonParser = bodyParser.json()

const secret = otplib.authenticator.generateSecret(); // generate the totp secret


app.get('/api', (req, res) => { // send the client the token when he loads page.
    const token = otplib.authenticator.generate(secret);
    const isValid = otplib.authenticator.check(token, secret);
    res.send({ token: token, secret: secret });
})


// check if token that client sends back is correct.
app.post('/check', jsonParser, (req, res) => {
    console.log(req.body);

    if (otplib.authenticator.check(req.body.token, secret)) {
        res.send("Valid Token");
    } else {
        res.send("invalid token");
    }
})

app.listen(5000);