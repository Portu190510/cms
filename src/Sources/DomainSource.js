import Config from '../config';
import ObjectToQuery from '../Utils/ObjectToQueryStringUtil';
import axios from 'axios';

var authConfig = Config.apiUrl.auth;

var DomainSource = {
    fetch: function (model) {
        return axios.get(`${authConfig.baseUrl}${authConfig.endpointUrl.domain.fetch}?${ObjectToQuery.asQuery(model)}`)
        .then(response => {
            return response.data;
        }).catch(response => {
            console.log(response);
        });
    },

    create: function (model) {
        return axios.post(`${authConfig.baseUrl}${authConfig.endpointUrl.domain.create}`, model).then(response => {
            return response.data;
        }).catch(response => {
            console.log(response);
        });
    },

    delete: function (domainId) {
        return axios.delete(`${authConfig.baseUrl}${authConfig.endpointUrl.domain.delete}?id=${domainId}`).then(response => {
            return response.data;
        }).catch(response => {
            console.log(response);
        });
    }
};

export default DomainSource;