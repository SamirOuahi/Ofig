const { Client } = require('pg');

// Je créer un nouveau client qui me permettra de faire mes requêtes en utilisant
// une variable d'environement contenant l'url de ma base de données
const client = new Client(process.env.PG_URL);

// Je me connecte à ma base de données
client.connect();

// J'exporte mon client
module.exports = client;
