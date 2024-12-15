const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { config } = require('dotenv');
const path = require('path');
config();

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


// 

const PROTO_PATH_CAREERS = path.join(__dirname, '../protobuf/careersManagement.proto');
const packageDefinitionCareers = protoLoader.loadSync(PROTO_PATH_CAREERS, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const careersProto = grpc.loadPackageDefinition(packageDefinitionCareers);

const clientCareers = new careersProto.career(process.env.GRPC_PORT_CAREERS, grpc.credentials.createInsecure());

const PROTO_PATH_SUBJECTS = path.join(__dirname, '../protobuf/subjectsManagement.proto');
const packageDefinitionSubjects = protoLoader.loadSync(PROTO_PATH_SUBJECTS, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const subjectsProto = grpc.loadPackageDefinition(packageDefinitionSubjects);

const clientSubjects = new subjectsProto.subject(process.env.GRPC_PORT_SUBJECTS, grpc.credentials.createInsecure());

module.exports = {clientUsers, clientCareers, clientSubjects};
