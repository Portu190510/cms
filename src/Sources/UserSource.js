import Config from '../config';
import axios from 'axios';
//import AuthStore from './../Stores/AuthStore';
var UserSource = {
  fetch: function (model) {

    //   var instance = axios.create({ 
    //        headers: {'Authorization': 'Bearer '+ AuthStore.getState().accessToken}
    //    });
    //  axios.defaults.headers['access_token'] = AuthStore.getState().accessToken;
    // console.log(AuthStore.getState().accessToken);

    //console.log(axios);

    //   axios.defaults.headers['Authorization'] = 'Bearer '+ AuthStore.getState().accessToken;
    return axios.get(Config.apiUrl + '/user'
      // ,  {
      //        headers: {
      //    'Authorization': 'Bearer '+ AuthStore.getState().accessToken
      //     }
      //      }
      //    , {headers:{
      //       'Authorization':'Bearer '+ AuthStore.getState().accessToken
      //   }}

    ).then(response => {
      return response.data;
    }).catch(response => {
      console.log(response);
    });
  }
};

export default UserSource;