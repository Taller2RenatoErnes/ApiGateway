const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.Server = require('http').createServer(this.app);

        this.middlewares();
    }

    middlewares() {
        this.app.use(logger('dev'));
        this.app.use(cors());
        this.app.use(express.json());
    }   




}

module.exports = Server;