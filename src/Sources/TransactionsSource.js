import Config from '../config';
import ObjectToQuery from '../Utils/ObjectToQueryStringUtil';
import axios from 'axios';

var gatewayConfig = Config.apiUrl.gateway;

var TransactionsSource = {
  fetch: function (model) {
    return axios.get(`${gatewayConfig.baseUrl}${gatewayConfig.endpointUrl.transactions.fetch}?${ObjectToQuery.asQuery(model)}`)
    .then(response => {
        return response.data;
      }).catch(response => {
        console.log(response);
      });
  },

  exportToCsv: function (idUsers) {
    return axios.post(`${gatewayConfig.baseUrl}${gatewayConfig.endpointUrl.transactions.export}`, idUsers)
      .then(response => {
        return response.data;
      }).catch(response => {
        console.log(response);
      });
  }
};

export default TransactionsSource;