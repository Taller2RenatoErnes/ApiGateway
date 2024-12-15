const { clientSubjects } = require('../../clients/grpcClient.js');  // Cliente GRPC para el servicio 'subject'
const { getTokenAuth } = require('../../middleware/jwt.js');

const subjectController = {

    async getSubjects(req, res) {

        clientSubjects.subjects({}, (error, response) => {
            if (error) {
                console.error('Error al obtener las asignaturas:', error);
                return res.status(500).json({ error: 'Error al obtener las asignaturas', details: error });
            }
            return res.json(response);
        });
    },

    async getPrerequisiteObjects(req, res) {
        const data  = req.body;
        const token = getTokenAuth(req);
        if (!token) {
            return res.status(400).json({ error: 'Token no proporcionado' });
        }
        clientSubjects.prerequisites_objects({ _id: data.subject_id }, (error, response) => {
            if (error) {
                console.error('Error al obtener los prerrequisitos:', error);
                return res.status(500).json({ error: 'Error al obtener los prerrequisitos', details: error });
            }
            return res.json(response);
        });
    },

    async getPrerequisiteMap(req, res) {
        const  data  = req.body;
        const token = getTokenAuth(req);
        if (!token) {
            return res.status(400).json({ error: 'Token no proporcionado' });
        }

        clientSubjects.prerequisites_map({ career_id: data.career_id }, (error, response) => {
            if (error) {
                console.error('Error al obtener el mapa de prerrequisitos:', error);
                return res.status(500).json({ error: 'Error al obtener el mapa de prerrequisitos', details: error });
            }
            return res.json(response);
        });
    },

    async getPostrequisiteMap(req, res) {
        const  data  = req.body;
        const token = getTokenAuth(req);

        if (!token) {
            return res.status(400).json({ error: 'Token no proporcionado' });
        }
        clientSubjects.postrequisites_map({ _id: data.career_id }, (error, response) => {
            if (error) {
                console.error('Error al obtener el mapa de postrequisitos:', error);
                return res.status(500).json({ error: 'Error al obtener el mapa de postrequisitos', details: error });
            }
            return res.json(response);
        });
    },
};

module.exports = subjectController;
