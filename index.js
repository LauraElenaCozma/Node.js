const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const generateMessage = require("./messageGenerator")
const hackNSA = require("./hackNSA")
//importam models care e index.js din models 
const models = require('./models');

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


//for database: npm install sqlite3;  npm install --save sequelize
//create folder storage + file sb.sqlite
//npx sequelize-cli init - o sa downloadeze sequelize-cli si o sa ii dea init
//face un folder config, migrations si seeder
/*config.json - mediile in care aplicatia este executata
 --lasam numami mediul development
 --nu avem host - stergem pentru ca aplicatia nu sta pe server
 --nu avem user si parola
 --avem o singura baza de date
 --poti pe development sa folosesti sqllite si pe production mysql
 DIALECT: sqlite --asta folosim
 STORAGE: fisierul creat, db.sqlite*/

 /*
  * facem o prima tabela, care va rezulta in urma unei migratii
    Ele sunt executate in ordinea cronologica in care s-au facut

    Prima oara generam un model
    Dupa attributes generam coloanele tabelului
    npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string 
    npx sequelize-cli db:migrate --executam migratiile
    npx sequelize-cli db:migrate:undo sterge ultima migratie
    
    npx sequelize-cli seed:generate --name demo-users --pentru a face seedul
    
    --dupa ce completam seed-ul
    npx sequelize-cli db:seed:all
    
    --npm install faker --save-dev - pentru a popula baza de date --completam in demo-users.js*/

app.get('/users/:userId', async function(req, res) {
    const userId = req.params.userId;
    const user = await models.User.findByPk(userId);
    console.log('user ', user);

    res.send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    })
})