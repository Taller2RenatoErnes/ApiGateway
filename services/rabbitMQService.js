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

        console.log("golaaaaaaaaaaa111111111", grpcAddress);

        this.grpcClient = new userProto.UserService(grpcAddress, grpc.credentials.createInsecure());
    }

    async setupRabbitMQ() {
        try {

            const connection = await amqp.connect(process.env.RABBITMQ_URL);
            channel = await connection.createChannel();

            await channel.assertQueue(this.queueName, { durable: true });

            console.log(`RabbitMQ configurado para la cola: ${this.queueName}`);
            this.consumeQueue();
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

                    console.log(`Operación recibida: ${operation}`);

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
                    console.log(`Respuesta gRPC ${methodName}:`, response);
                    resolve(response);
                }
            });
        });
    }
}

module.exports = RabbitService;
