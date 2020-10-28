const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const generateMessage = require("./messageGenerator")
const hackNSA = require("./hackNSA")

app.use(express.json());

/*app.get('/hello-world', async (req, res) => {
    const body = generateMessage.GetFact();
    body.then((body) => res.send(body.text))
    
    /*generateMessage()
        .then(body => {
                const {text} = body;   //take text property of json
                console.log("Hello world");
                res.send(text);}
             )
});*/

const authorizationMiddleware = (req, res, next) => {
    const {authorization} = req.headers;
    if (!authorization) {
        return res.send("No authorization");
    }
    const jwtToken = authorization.replace("Bearer ", "");
    jwt.verify(jwtToken, config.secretKey, (err, decoded) => {
        if(err) {
            res
            .status(401)
            .send({"status": "not ok"});
        }
        else {
            next();
        }
    })
}

app.post('/graphql', authorizationMiddleware, (req, res) => {
    res.send({
        'status': 'ok',
    });
});

const config = {secretKey: 'SuperSecretKey'};

app.post('/graphql/public', (req, res) => {
    console.log("IM HERE");
    const {user, pass} = req.body;
    if(user === "laura" && pass === "123") {
        jwt.sign({}, config.secretKey, (err, token) => {
            res.send({
                token});
        })
    }
});

app.get('/hackNSA', async (req, res) => {
    const {password} = await hackNSA();
    /*hack.then(({password}) => {
        res.send(password);
    })
        .catch(({password}) => 
        {res.send(password);
        console.log("eroare" + password)});*/

    res.send({password});
});

app.listen(port, () => {
    console.log("Server started!");
})
