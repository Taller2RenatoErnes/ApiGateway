const { default: axios } = require("axios");
const baseURL = 'http://localhost:80/api/resources';

const allSubjects = async (req, res) => {
    try {
        const subjects = await axios.get(baseURL);
        return res.status(200).json(subjects.data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const allResourcesBySubject = async (req, res) => {
    try {
        const { subjectId } = req.params;
        const resources = await axios.get(`${baseURL}/${subjectId}`);
        return res.status(200).json(resources.data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    allSubjects,
    allResourcesBySubject
}