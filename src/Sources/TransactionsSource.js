import Config from '../config';
import ObjectToQuery from '../Utils/ObjectToQueryStringUtil';
import axios from 'axios';

var TransactionsSource = {
  fetch: function (model) {
    return axios.get(`${Config.endpointUrl.transactions.apiUrl}${Config.endpointUrl.transactions.fetch}?${ObjectToQuery.asQuery(model)}`)
    .then(response => {
        return response.data;
      }).catch(response => {
        console.log(response);
      });
  },

  exportToCsv: function (idUsers) {
    return axios.post(`${Config.endpointUrl.transactions.apiUrl}${Config.endpointUrl.transactions.export}`, idUsers)
      .then(response => {
        return response.data;
      }).catch(response => {
        console.log(response);
      });
  }
};

export default TransactionsSource;