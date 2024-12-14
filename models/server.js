const express = require('express');
const logger = require('morgan');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.server = require('http').createServer(this.app);
        this.paths = {
            resources: '/api/resources',
        }
        this.middlewares();
    }

    middlewares() {
        this.app.use(logger('dev'));
        this.app.use(cors());
        this.app.use(express.json());
    }

 

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor HTTP corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;
