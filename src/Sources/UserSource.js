import Config from '../config';
import axios from 'axios';

var UserSource = {
  fetch: function (model) {
    return axios.get(`${Config.apiUrl}${Config.endpointUrl.user.fetch}?firstName=${model.firstName}&lastName=${model.lastName}&userId=${model.userId}&email=${model.email}&orderBy=${model.orderBy}&sortOrder=${model.sortOrder}&start=${model.start}&limit=${model.limit}`)
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