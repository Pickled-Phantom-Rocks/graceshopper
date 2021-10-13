const { Client } = require('pg'); 
const client = new Client(process.env.DATABASE_URL || 'postgresql://pjsandwich:123456@localhost:5432/fitness-dev');
//fix this to be correct for this project

module.exports =  client 