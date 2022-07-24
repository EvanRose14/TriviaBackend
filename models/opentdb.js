// See documentationhttps://opentdb.com/api_config.php
const axios = require('axios')
const base_url = 'https://opentdb.com/'
const api_url =  base_url + 'api.php'
const token_url = base_url + 'api_token.php'

module.exports = class OpenTDB {
    constructor() {}
    static async getQuestion() {
        const {data} = await axios.get(api_url, {
            params: {amount: 10}
        }).catch(e => {
            console.error(`Error getting all users: ${e}`);
            throw new Error(e.message);
        });
        return data;
    }
    
    static async getSessionToken() {
        console.log(token_url);
        const {data} = await axios.get(token_url + '?command=request').catch(e => {
            console.error(`Error getting all users: ${e}`);
            throw new Error(e.message);
        });
        return data;
    }
}