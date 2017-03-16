import Config from '../config';
import axios from 'axios';

var UserSource = {
    fetch: function (model) {
        return axios.get(Config.apiUrl + '/courses').then(response => {
            return response.data;
        }).catch(response => {
            console.log(response);
        });
    }
};

export default UserSource;