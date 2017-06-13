import Config from '../config';
import ObjectToQuery from '../Utils/ObjectToQueryStringUtil';
import axios from 'axios';

var gatewayConfig = Config.apiUrl.gateway;

var CourseSource = {
    fetch: function (model) {
        return axios.get(`${gatewayConfig.baseUrl}${gatewayConfig.endpointUrl.course.fetch}?${ObjectToQuery.asQuery(model)}`)
        .then(response => {
            return response.data;
        }).catch(response => {
            console.log(response);
        });
    },
    exportToCsv: function (idList) {
    return axios.post(`${gatewayConfig.baseUrl}${gatewayConfig.endpointUrl.course.export}`, {filter: {id:idList.join(',')}})
      .then(response => {
        return response.data;
      }).catch(response => {
        console.log(response);
      });
  }
};

export default CourseSource;