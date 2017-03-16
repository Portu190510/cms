import Config from '../config';
import axios from 'axios';

var DomainSource = {
    fetch: function (model) {
        return axios.get(Config.apiUrl + '/domain?' + 'start=' + model.start + '&limit=' + model.limit).then(response => {
            return response.data;
        }).catch(response => {
            console.log(response);
        });
    },

    create: function (model) {
        return axios.post(Config.apiUrl + '/domain', model).then(response => {
            return response.data;
        }).catch(response => {
            console.log(response);
        });
    },

    delete: function (domainId) {
        return axios.delete(Config.apiUrl + '/domain?id=' + domainId).then(response => {
            return response.data;
        }).catch(response => {
            console.log(response);
        });
    }
};

export default DomainSource;