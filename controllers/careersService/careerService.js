
const { clientCareers } = require('../../clients/grpcClient.js');

const careerController = {
    async getCareers(req, res) {
        clientCareers.careers({}, (error, response) => {
            if (error) {
                console.error('Error al obtener carreras:', error);
                return res.status(500).json({ error: 'Error al obtener carreras', details: error });
            }
            return res.json(response);  
        });
    },
};

module.exports = careerController;