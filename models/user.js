const db = require('../util/database');

module.exports = class User {
    constructor(name, email, password) {
        this.name = name
        this.email = email
        this.password = password
    }
    

    static getAllUsers() {
        const query = "SELECT * FROM trivia.users"

        return db.query(query)
        .then(res => {
            return res;
        }).catch(e => {
            console.error(`Error getting all users: ${e}`);
            throw new Error(e.message);
        })
    }


    static findByEmail(email) {
        const query = "SELECT * FROM trivia.users WHERE email=$1"
        const values = [email]

        return db.query(query, values)
        .then(res => {
            return res;
        })
        .catch(e => {
            console.error(`Error finding user by email: ${e}`)
            throw new Error(e.message);
        });
    }


    static findByUsername(username) {
        const query = "SELECT * FROM trivia.users WHERE name=$1"
        const values = [username]

        return db.query(query, values)
        .then(res => {
            return res;
        })
        .catch(e => {
            console.error(`Error finding user by username: ${e}`)
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