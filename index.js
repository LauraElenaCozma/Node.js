const express = require('express');
const app = express();
const port = 3000;
const generateMessage = require('./messageGenerator');

app.get('/hello-world', (req, res) => {
    generateMessage()
        .then(
            (body) => {
                const {text} = body;
                console.log("Hello world");
                res.send(text);
            }
        )
});

app.listen(port, () => {
    console.log("Server started!");
})