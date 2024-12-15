
const { clientUsers } = require('../../clients/grpcClient.js');
const { getIdJWT, getTokenAuth } = require('../../middleware/jwt.js')
const grpc = require('@grpc/grpc-js');

const userController = {

    async register(req, res) {
        const { name, firstLastname, secondLastname, rut, email, password, idCareer } = req.body;

        clientUsers.CreateUser({ name, firstLastname, secondLastname, rut, email, password, idCareer }, (error, response) => {
            if (error) {
                console.error('Error al registrar usuario:', error);
                return res.status(500).json({ error: 'Error al registrar usuario', details: error });
            }
            return res.json(response);
        });
    },

    async updateProfile(req, res) {
        const token = getTokenAuth(req);
        const { name, firstLastname, secondLastname } = req.body;

        if (!token) {
            return res.status(400).json({ error: 'Token no proporcionado' });
        }
        const metadata = new grpc.Metadata();
        metadata.add('authorization', `Bearer ${token}`);
        clientUsers.UpdateProfile({ name, firstLastname, secondLastname }, metadata, (error, response) => {
            if (error) {
                console.error('Error al actualizar perfil:', error);
                return res.status(500).json({ error: 'Error al actualizar perfil', details: error });
            }
            return res.json(response);
        });
    },

    async profile(req, res) {
        const token = getTokenAuth(req);
        const metadata = new grpc.Metadata();
        metadata.add('authorization', `Bearer ${token}`);
        if (!token) {
            return res.status(400).json({ error: 'Token no proporcionado' });
        }

        clientUsers.GetProfile({}, metadata, (error, response) => {
            if (error) {
                console.error('Error al obtener perfil:', error);
                return res.status(500).json({ error: 'Error al obtener perfil', details: error });
            }
            return res.json(response);
        });
    },

    async myProgress(req, res) {
        const token = getTokenAuth(req);

        if (!token) {
            return res.status(400).json({ error: 'Token no proporcionado' });
        }
        const metadata = new grpc.Metadata();
        metadata.add('authorization', `Bearer ${token}`);
        
        clientUsers.GetProgress({}, metadata, (error, response) => {
            if (error) {
                console.error('Error al obtener progreso:', error);
                return res.status(500).json({ error: 'Error al obtener progreso', details: error });
            }
            return res.json(response);
        });
    },

    async updateProgress(req, res) {
        const token = getTokenAuth(req);

        if (!token) {
            return res.status(400).json({ error: 'Token no proporcionado' });
        }
        const { approvedCourses, removedCourses } = req.body;
        const metadata = new grpc.Metadata();
        metadata.add('authorization', `Bearer ${token}`);

        clientUsers.UpdateProgress({ approvedCourses, removedCourses }, metadata, (error, response) => {
            if (error) {
                console.error('Error al actualizar progreso:', error);
                return res.status(500).json({ error: 'Error al actualizar progreso', details: error });
            }
            return res.json(response);
        });
    },
};

module.exports = userController;