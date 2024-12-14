const amqp = require('amqplib');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const QUEUES = {
    auth: 'auth_queue',
    careers: 'careers_queue',
    users: 'users_queue',
};

const PROTO_PATH = './protobuf/usersManagement.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const userProto = grpc.loadPackageDefinition(packageDefinition).usermanagement;

let channel;

class RabbitService {

    constructor(queueName, handlers, grpcAddress) {

        this.queueName = queueName;
        this.handlers = handlers;
        this.grpcClient = new userProto.UserService(grpcAddress, grpc.credentials.createInsecure());
    }

    async sendLoginMessage() {
        try {
            const loginData = {
                email: 'Briana8@hotmail.com',
                password: '123'
            };

            const message = {
                operation: 'Login',
                data: loginData,
                replyTo: "auth_queue",
            };

            await channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(message)));
            console.log('Mensaje de login enviado a la cola:', this.queueName);
        } catch (error) {
            console.error('Error al enviar el mensaje de login:', error);
        }
    }

    async setupRabbitMQ() {
        try {

            const connection = await amqp.connect(process.env.RABBITMQ_URL);
            channel = await connection.createChannel();

            await channel.assertQueue(this.queueName, { durable: true });

            console.log(`RabbitMQ configurado para la cola: ${this.queueName}`);
            this.consumeQueue();


            await this.sendLoginMessage();

        } catch (error) {
            console.error(`Error configurando RabbitMQ para ${this.queueName}:`, error);
        }
    }

    consumeQueue() {
        console.log(`Escuchando mensajes en la cola: ${this.queueName}...`);
    
        channel.consume(
            this.queueName,
            async (msg) => {
                try {
                    const message = JSON.parse(msg.content.toString());
    
                    const { operation, data, correlationId, replyTo } = message;

                    if (this.handlers[operation]) {
                        const result = await this.handlers[operation](data);
                        
                        if (replyTo) {
                            channel.sendToQueue(
                                replyTo,
                                Buffer.from(JSON.stringify({ correlationId, result })),
                                { correlationId }
                            );
                            console.log(`Respuesta enviada a ${replyTo} para la operación ${operation}.`);
                        }
                    } else {
                        console.error(`Operación no soportada: ${operation}`);
                    }
    
                    channel.ack(msg);
                } catch (error) {
                    console.error(`Error procesando mensaje en ${this.queueName}:`, error);
                    channel.nack(msg);
                }
            },
            { noAck: false }
        );
    }
    
    callGrpcMethod(methodName, data) {
        return new Promise((resolve, reject) => {
            this.grpcClient[methodName](data, (err, response) => {
                if (err) {
                    console.error(`Error llamando a gRPC ${methodName}:`, err);
                    reject(err);
                } else {
                    resolve(response);
                }
            });
        });
    }
}

module.exports = RabbitService;
