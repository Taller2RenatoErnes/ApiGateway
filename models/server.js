const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const RabbitService = require('./rabbitMQService');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.Server = require('http').createServer(this.app);

        this.middlewares();
    }

    rabbitMQ(){
        const rabbitService = new RabbitService();
        rabbitService.setupRabbitMQ();
    }

    middlewares() {
        this.app.use(logger('dev'));
        this.app.use(cors());
        this.app.use(express.json());
    }   

    listen() {
        this.Server.listen(this.port, () => {
            console.log('Servidor HTTP corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;