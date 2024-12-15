const { clientUsers } = require('../../clients/grpcClient.js');
const {getIdJWT, getTokenAuth} = require ('../../middleware/jwt.js')

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

        clientUsers.UpdateProfile({ token, name, firstLastname, secondLastname }, (error, response) => {
            if (error) {
                console.error('Error al actualizar perfil:', error);
                return res.status(500).json({ error: 'Error al actualizar perfil', details: error });
            }
            return res.json(response);
        });
    },

    async profile(req, res) {
        const token = getTokenAuth(req);

        if (!token) {
            return res.status(400).json({ error: 'Token no proporcionado' });
        }

        clientUsers.GetProfile({ token }, (error, response) => {
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

        clientUsers.GetProgress({ token }, (error, response) => {
            if (error) {
                console.error('Error al obtener progreso:', error);
                return res.status(500).json({ error: 'Error al obtener progreso', details: error });
            }
            return res.json(response);
        });
    },

    async updateProgress(req, res) {
        const { approvedCourses, removedCourses } = req.body;

        clientUsers.UpdateProgress({ approvedCourses, removedCourses }, (error, response) => {
            if (error) {
                console.error('Error al actualizar progreso:', error);
                return res.status(500).json({ error: 'Error al actualizar progreso', details: error });
            }
            return res.json(response);
        });
    },
};

module.exports = userController;
