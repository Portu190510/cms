import Config from '../config';
import ObjectToQuery from '../Utils/ObjectToQueryStringUtil';
import axios from 'axios';

var authConfig = Config.apiUrl.auth;

var UserSource = {
  fetch: function (model) {
    return axios.get(`${authConfig.baseUrl}${authConfig.endpointUrl.user.fetch}?${ObjectToQuery.asQuery(model)}`)
    .then(response => {
        return response.data;
      }).catch(response => {
        console.log(response);
      });
  },

  exportToCsv: function (idUsers) {
    return axios.post(`${authConfig.baseUrl}${authConfig.endpointUrl.user.export}`, idUsers)
      .then(response => {
        return response.data;
      }).catch(response => {
        console.log(response);
      });
  }
};

export default UserSource;