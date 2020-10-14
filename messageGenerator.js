const url = "https://cat-fact.herokuapp.com/facts/random";
const fetch = require("node-fetch");
const generateMessage = () => {
    return fetch(url)
            .then(res => res.json());
}

module.exports = generateMessage;

