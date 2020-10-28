const fetch = require("node-fetch");

/*
const url = "https://cat-fact.herokuapp.com/facts/random";
const generateMessage = () => {
    return fetch(url)
            .then(res => res.json());
}
*/
class CatFacts {
    constructor() {
        this.url = "https://cat-fact.herokuapp.com/facts/random";
        console.log(this.url);
    }
    GetFact() {
        return fetch(this.url)
            .then(res => res.json());
    }
}
module.exports = new CatFacts();