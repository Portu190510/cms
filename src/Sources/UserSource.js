import Config from '../config';
import ObjectToQuery from '../Utils/ObjectToQueryStringUtil';
import axios from 'axios';

var UserSource = {
  fetch: function (model) {
    return axios.get(`${Config.apiUrl}${Config.endpointUrl.user.fetch}?${ObjectToQuery.asQuery(model)}`)
    .then(response => {
        return response.data;
      }).catch(response => {
        console.log(response);
      });
  },

  exportToCsv: function (idUsers) {
    return axios.post(`${Config.apiUrl}${Config.endpointUrl.user.export}`, idUsers)
      .then(response => {
        return response.data;
      }).catch(response => {
        console.log(response);
      });
  }
};

export default UserSource;