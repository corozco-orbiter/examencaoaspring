import axios from 'axios';


export default class EmpleadoService {

    url = "http://localhost:8080/api/v1/";

    getAll() {
        return axios.get(this.url + "all");
    }

    save(empleados) {
        return axios.post(this.url + "save", empleados)
    }

    delete(id) {
        return axios.get(this.url + "delete/"+ id)
    }
}