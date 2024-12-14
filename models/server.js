const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const RabbitService = require('../services/rabbitMQService');
const { authHandlers, careersHandlers, usersHandlers } = require('../services/handlers');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.server = require('http').createServer(this.app);

        this.rabbitServices = {};
        this.middlewares();
        this.setupRabbitMQ();
    }

    middlewares() {
        this.app.use(logger('dev'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    setupRabbitMQ() {
        try {

            const grpcAddress = process.env.GRPC_PORT_USERS;
            console.log('Dirección gRPC:', grpcAddress);
            
            if (!grpcAddress || typeof grpcAddress !== 'string') {
                throw new Error('El parámetro grpcAddress debe ser una cadena válida.');
            }

            this.rabbitServices.users = new RabbitService('users_queue', usersHandlers, grpcAddress);
            // this.rabbitServices.auth = new RabbitService('auth_queue', authHandlers);
            // this.rabbitServices.careers = new RabbitService('careers_queue', careersHandlers);

            // this.rabbitServices.auth.setupRabbitMQ();
            // this.rabbitServices.careers.setupRabbitMQ();
            this.rabbitServices.users.setupRabbitMQ();
        } catch (error) {
            console.error('Error configurando RabbitMQ:', error);
        }
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor HTTP corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;
