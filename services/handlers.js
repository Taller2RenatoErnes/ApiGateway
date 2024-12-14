const RabbitService = require("./rabbitMQService");
const rabbitService = new RabbitService('users_queue', {}, 'localhost:50051'); // Ajusta el address del gRPC si es necesario

const authHandlers = {
    login: async (data) => {
        const { username, password } = data;
        console.log(`Autenticando usuario: ${username}`);
        return { status: 'success', token: 'example_token' };
    },
    verifyToken: async (data) => {
        const { token } = data;
        console.log(`Verificando token: ${token}`);
        const isValid = token === 'example_token';
        return { status: isValid ? 'success' : 'failure', isValid };
    },
};

const careersHandlers = {
    addCareer: async (data) => {
        const { careerName } = data;
        console.log(`Agregando carrera: ${careerName}`);
        return { status: 'success', message: `Carrera ${careerName} agregada correctamente.` };
    },
    updateCareer: async (data) => {
        const { careerId, updates } = data;
        console.log(`Actualizando carrera ${careerId} con:`, updates);
        return { status: 'success', message: `Carrera ${careerId} actualizada correctamente.` };
    },
};

const usersHandlers = {
    Login: async (data) => {
        const { email, password } = data;
        console.log(`Iniciando sesión usuario: ${email}`);

        try {
            const response = await rabbitService.callGrpcMethod('Login', { email, password });
            console.log(`Respuesta de gRPC para Login:`, response);

            if (response.error) {
                return { status: 'failure', message: response.message };
            }

            return { status: 'success', token: response.token, message: response.message };
        } catch (error) {
            console.error(`Error durante Login:`, error);
            return { status: 'failure', message: 'Error al iniciar sesión.' };
        }
    },
};


module.exports = { authHandlers, careersHandlers, usersHandlers };
