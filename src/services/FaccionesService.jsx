// src/services/FaccionesService.jsx
import axios from 'axios';

const BASE_URL = 'https://naves-back.onrender.com/api/facciones';

class FaccionesService {
    async getAllFacciones() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener facciones:', error);
            throw error;
        }
    }
}

export default new FaccionesService();