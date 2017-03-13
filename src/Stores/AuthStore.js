import alt from '../Alt';
import AuthActions from '../Actions/AuthActions';
import InterceptorUtil from '../Utils/InterceptorUtil';
import Config from '../config';
import {browserHistory} from 'react-router';
import axios from 'axios';
import Uri from 'jsuri';

class AuthStore {
  constructor() {
    this.bindActions(AuthActions);

    // State
    this.accessToken = null;
    this.refreshToken = null;
    this.user = null;
    this.error = null;
  }
  // client_id=' + Config.clientId +
  // '&redirect_uri=http://localhost:5002/signin-oidc'+ 'response_type=token'+
  // 'scope=LMS';      '&client_secret=' + Config.clientSecret + '&grant_type=' +
  // grantType;

  /*
{
      client_id: Config.clientId,
      grant_type: 'password',
      scope: 'LMS',
      client_secret: Config.clientSecret,
      password: credentials.password,
      username: credentials.username

    }
        var params = new URLSearchParams();
    params.append('username', credentials.username);
    params.append('client_id', Config.clientId);
    params.append('password', credentials.password);
    params.append('scope', 'LMS');
    params.append('client_secret', Config.clientSecret);
    params.append('grant_type', 'password');
  */
  onLogin(credentials) {

    var item = {
      client_id: Config.clientId,
      grant_type: 'password',
      scope: 'LMS',
      client_secret: Config.clientSecret,
      password: credentials.password,
      username: credentials.username

    };
    var form_data = new FormData();

    for (var key in item) {
      form_data.append(key, item[key]);
    }

    axios.post(Config.apiUrl+ '/connect/token', form_data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    })
      .then(response => {
        this.saveTokens(response.data);
      //   return axios.get(Config.apiUrl + '/user');
      return {data:{user:null}};
       
      })
      .then(response => {
        this.loginSuccess(response.data.user);
      })
      .catch(response => {
        this.loginError(response);
      });
  }

  loginSuccess(user) {
 //   localStorage.setItem('user', JSON.stringify(user));
//    this.setState({user: user});
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

    // Automatically add access token
    var interceptor = axios
      .interceptors
      .request
      .use((config) => {
     //   config.url = new Uri(config.url).addQueryParam('access_token', access_token);
      config.headers.access_token =  access_token;
        return config;
      });

    InterceptorUtil.setInterceptor(interceptor)
  }

  getAuthEndpoint(grantType = 'password') {
    return Config.apiUrl + '/connect/authorize/login?client_id=' + Config.clientId +
    //     '&redirect_uri=http://localhost:5002/signin-oidc'+ 'response_type=token'+
    '&scope=LMS&client_secret=' + Config.clientSecret + '&grant_type=' + grantType;
  }
}

export default alt.createStore(AuthStore, 'AuthStore');