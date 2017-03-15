import alt from '../Alt';
import AuthActions from '../Actions/AuthActions';
import InterceptorUtil from '../Utils/InterceptorUtil';
import Config from '../config';
import {browserHistory} from 'react-router';
import axios from 'axios';

class AuthStore {
  constructor() {
    this.bindActions(AuthActions);

    // State
    this.accessToken = null;
    this.refreshToken = null;
    this.user = null;
    this.error = null;
  }

  onLogin(credentials) {
    var authData = {
      client_id: Config.clientId,
      grant_type: Config.grant_type,
      scope: Config.scope,
      client_secret: Config.clientSecret,
      password: credentials.password,
      username: credentials.username
    };

   // axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
  //  axios.defaults.headers['Access-Control-Allow-Headers'] = '*';
   // axios.defaults.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS';

    axios.post(this.getAuthEndpoint('password'), this.getFormData(authData), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    }).then(response => {
        this.saveTokens(response.data);
        var userInfo =JSON.parse(window.atob(response.data.access_token.split('.')[1]) );
        return userInfo;
      })
      .then(userInfo => {
        this.loginSuccess(userInfo);
      })
      .catch(response => {
        this.loginError(response);
      });
  }

  loginSuccess(userInfo) {
    var user = {
      name: userInfo.name,
      sub:userInfo.sub,
      role:userInfo.role
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    this.setState({user: user});
    browserHistory.push('/');
  }

  loginError(response) {
    this.setState({accessToken: null, refreshToken: null, error: response.data.error_description, user: null});
  }

  onLocalLogin() {
    let accessToken = localStorage.getItem('access_token');
    let refreshToken = localStorage.getItem('refresh_token');
    let user = JSON.parse(localStorage.getItem('user'));

  //  if (accessToken && refreshToken && user) {
     if (accessToken){
      this.saveTokens({access_token: accessToken, refresh_token: refreshToken});
      this.loginSuccess(user);
    }
  }

  onRefreshToken(params) {
    let refreshToken = localStorage.getItem('refresh_token');

    if (refreshToken) {
      axios
        .interceptors
        .request
        .eject(InterceptorUtil.getInterceptor());
      axios.get(this.getAuthEndpoint('refresh_token') + '&refresh_token=' + refreshToken).then(response => {
        this.saveTokens(response.data);

        // Replay request
        axios(params.initialRequest).then(response => {
          params.resolve(response);
        }).catch(response => {
          params.reject(response);
        });
      }).catch(() => {
        this.onLogout();
      });
    }
  }

  onLogout() {
    localStorage.clear();

    this.setState({accessToken: null, refreshToken: null, error: null});

    axios
      .interceptors
      .request
      .eject(InterceptorUtil.getInterceptor());

    browserHistory.push('/login');
  }

  saveTokens(params) {
    const {access_token, refresh_token} = params;

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    this.setState({accessToken: access_token, refreshToken: refresh_token, error: null});

    axios.defaults.headers.common['Authorization'] = 'Bearer '+access_token;

    // Automatically add access token
    var interceptor = axios
      .interceptors
      .request
      .use((config) => {
     //   config.url = new Uri(config.url).addQueryParam('access_token', access_token);
     
      config.headers['Authorization'] = 'Bearer '+ access_token; 
  //    config.headers.access_token =  access_token;
        return config;
      });

    InterceptorUtil.setInterceptor(interceptor)
  }

  getAuthEndpoint(grantType = 'password') {
    return Config.apiUrl + '/connect/token';
  }

  getFormData(data){
    var form_data = new FormData();

    for (var key in data) {
      form_data.append(key, data[key]);
    }

    return form_data;
  }
}

export default alt.createStore(AuthStore, 'AuthStore');