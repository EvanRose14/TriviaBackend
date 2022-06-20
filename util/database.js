const { Client } = require('pg')

const config = require('../conf/config.json');

const client = new Client({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
})
client.connect()
    .then(() => console.log(`Connected to ${client.database} ${client.user}@${client.host}:${client.port}`))
    .catch(e => console.log(`Error connecting to ${client.host} -- ${e}`))

 module.exports = client;