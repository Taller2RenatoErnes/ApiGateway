const axios = require('axios');
const baseURL = 'http://localhost:4000/api/access';


const login = async (req, res) => {
  try {
    const data = req.body;

    const user = await axios.post(`${baseURL}/login`, data);
    return res.set('Authorization', user.headers.authorization).json(user.data.message).status(200);
    } catch (error) {
        if(error.status === 404) {
            return res.status(404).json({ error: true, message: 'No se pudo encontrar' });
        }
        else if(error.status === 401) {
            return res.status(401).json({ error: true, message: error.response.data.message });
        }
    return res.status(500).json({ error: error.response.data.message });
    }
}
const validateToken = async (req, res) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ error: true, message: 'Token no proporcionado' });
    }
    

      const user = await axios.post(`${baseURL}/validate`, {}, {
        headers: {
            Authorization: token,
        }
      });
      console.log(user.data);
      return res.status(200).json(user.data);
      } catch (error) {
        //console.log(error);
          if(error.status === 404) {
              return res.status(404).json({ error: true, message: 'No se pudo encontrar' });
          }
          else if(error.status === 401) {
              return res.status(401).json({ error: true, message: error.response.data.error });
          }
      return res.status(500).json({ error: error.response.data.message });
      }
  }


const getUserId = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const data = await axios.post(`${baseURL}/getId`, {}, {
            headers: {
                Authorization: token,
            }
          });
        return res.json(data.data).status(200);
    } catch (error) {
        console.log(error);
        if(error.status === 404) {
        return res.status(404).json({ error: true, message: 'No se pudo encontrar' });
        }
        else if(error.status === 401) {
        return res.status(401).json({ error: true, message: error.response.data.message });
        }
        return res.status(500).json({ error: error });
    }
};
module.exports = {login, validateToken, getUserId};