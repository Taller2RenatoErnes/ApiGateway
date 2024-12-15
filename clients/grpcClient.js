const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '../protobuf/usersManagement.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const usersProto = grpc.loadPackageDefinition(packageDefinition).usermanagement;

const clientUsers = new usersProto.UserService(process.env.GRPC_PORT_USERS, grpc.credentials.createInsecure());

//TODO: Cambia la wea aca renatoxxxxxxxxxxxxxxxxxxxxxxxxxx con tu process.env.GRPC_PORT_CAREERS, kuidao no sea el mismo puerto
// const clientCareers = new usersProto.UserService(process.env.GRPC_PORT_USERS, grpc.credentials.createInsecure());

//TODO: Agrega el clientCareers aki tmb
module.exports = {clientUsers};
