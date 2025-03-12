const http = require('http');

const app = require('./app/app.js');
const config = require('./app/config.js');
const db = require('./app/db.js');

const server = http.createServer(app);

db.connect(config.dbInfo)
    .then(() => {
        console.log('Database connected');
        server.listen(config.httpPort);
    })
    .catch(err => {
        console.log('Database not connnected');
    })