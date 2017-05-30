import Config from '../config';
import ObjectToQuery from '../Utils/ObjectToQueryStringUtil';
import axios from 'axios';

var DomainSource = {
    fetch: function (model) {
        return axios.get(`${Config.apiUrl}${Config.endpointUrl.domain.fetch}?${ObjectToQuery.asQuery(model)}`)
        .then(response => {
            return response.data;
        }).catch(response => {
            console.log(response);
        });
    },

    create: function (model) {
        return axios.post(`${Config.apiUrl}${Config.endpointUrl.domain.create}`, model).then(response => {
            return response.data;
        }).catch(response => {
            console.log(response);
        });
    },

    delete: function (domainId) {
        return axios.delete(`${Config.apiUrl}${Config.endpointUrl.domain.delete}?id=${domainId}`).then(response => {
            return response.data;
        }).catch(response => {
            console.log(response);
        });
    }
};

export default DomainSource;