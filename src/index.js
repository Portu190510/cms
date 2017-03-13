import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import './index.css';

import App from './App';
import UserReportComponent from "./Components/UserReportComponent";
import CoursesReportComponent from "./Components/CoursesReportComponent";
import Login from './Components/Auth/Login';
import NotFoundComponent from "./Components/Common/NotFoundComponent";

import axios from 'axios';
import AuthActions from './Actions/AuthActions';
import AuthStore from './Stores/AuthStore';

AuthActions.localLogin();

function requireAuth(nextState, replaceState) {
  if (AuthStore.getState().accessToken === null) {
    replaceState('/login');
  }
}

// Handle API request errors
axios
  .interceptors
  .response
  .use(response => {
     // intercept OPTIONS method
    return response;
  }, error => {
    return new Promise((resolve, reject) => {
      if (error.status === 401 && error.data.error_description === 'The access token provided has expired.') {
        AuthActions.refreshToken({initialRequest: error.config, resolve: resolve, reject: reject});
      } else if (error.status === 401 && error.statusText === 'Unauthorized') {
        AuthActions.logout();
      } else {
        reject(error);
      }
    });
  });

ReactDOM.render(
  <Router history={browserHistory}>
  <Route path="/" component={App} onEnter={requireAuth}>
    <Route path="user-report" component={UserReportComponent} onEnter={requireAuth}/>
    <Route
      path="courses-report"
      component={CoursesReportComponent}
      onEnter={requireAuth}/>
    <IndexRoute component={UserReportComponent} onEnter={requireAuth}/>
  </Route>
  <Route path="login" component={Login}/>
  <Route path="*" component={NotFoundComponent}/>
</Router>, document.getElementById('root'));