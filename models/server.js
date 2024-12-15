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
            auth: '/api/auth',
            users: '/api/users',
            careers: '/api/careers',
            auth: '/api/auth',
        }
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(logger('dev'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.paths.resources, require('../routes/monolithRoutes'));
    }
    
    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor HTTP corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;
