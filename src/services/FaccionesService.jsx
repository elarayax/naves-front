import axios from 'axios';

const BASE_URL = 'https://naves-back.onrender.com/api/facciones';

class UserService {

    getAllFacciones() {
        return axios.get(BASE_URL);
    }
}

export default new UserService();