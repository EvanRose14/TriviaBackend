const db = require('../util/database');

module.exports = class User {
    constructor(name, email, password) {
        this.name = name
        this.email = email
        this.password = password
    }

    static find(email) {
        const query = "SELECT * FROM trivia.users WHERE email=$1"
        const values = [email]

        return db.query(query, values)
        .then(res => {
            return res;
        })
        .catch(e => {
            console.error(`Error finding email: ${e}`)
            throw new Error(e.message);
        });
    }

    static save(user) {
        const query = "INSERT INTO trivia.users (name, email, password) VALUES ($1, $2, $3)"
        const values = [user.name, user.email, user.password]

        return db.query(query, values)
        .then(res => {
            return res;
        })
        .catch(e => {
            console.error(`Error saving user: ${e}`);
            throw new Error(e.message);
        });
    }
}