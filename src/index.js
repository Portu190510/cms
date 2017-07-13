import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import './index.css';
import './Styles/BusyLoaderStyleSheet.css';

import App from './App';
import UserReportComponent from "./Components/UserReport/UserReportComponent";
import CoursesReportComponent from "./Components/Courses/CoursesReportComponent";
import DomainManagementComponent from "./Components/DomainManagement/DomainManagementComponent";
import CategoryManagementComponent from "./Components/CategoryManagement/CategoryManagementComponent";
import CourseRegistrationsComponent from "./Components/CourseRegistrations/CourseRegistrationsComponent";
import TransactionsReportComponent from "./Components/Transactions/TransactionsReportComponent";
import CoursesOnReviewComponent from "./Components/CoursesOnReview/CoursesOnReviewComponent";
import CoursesPerCategoryComponent  from "./Components/CoursesPerCategory/CoursesPerCategoryComponent";
import Login from './Components/Auth/Login';
import NotFoundComponent from "./Components/Common/NotFoundComponent";

import axios from 'axios';
import AuthActions from './Actions/AuthActions';
import AuthStore from './Stores/AuthStore';
import Config from './config';

AuthActions.localLogin();
document.title = Config.environmentName + ' CMS';

function requireAuth(nextState, replaceState) {
  if (AuthStore.getState().accessToken === null) {
    replaceState('/login');
  }
}

axios.interceptors.request.use(function (config) {
  document.getElementById("loading").style.display = "block";
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Handle API request errors
axios.interceptors.response.use(response => {
  document.getElementById("loading").style.display = "none";
  return response;
}, error => {
  document.getElementById("loading").style.display = "none";
  return new Promise((resolve, reject) => {
    if (error.status === 401 && error.data.error_description === 'The access token provided has expired.') {
      AuthActions.refreshToken({ initialRequest: error.config, resolve: resolve, reject: reject });
    } else if (error.status === 401 && error.statusText === 'Unauthorized') {
      AuthActions.logout();
    } else {
      reject(error);
    }
  });
});

ReactDOM.render(
  <Router history={browserHistory} >
    <Route path="/" component={App} onEnter={requireAuth}>
      <IndexRoute component={DomainManagementComponent} onEnter={requireAuth} />
      <Route path="domain-management" component={DomainManagementComponent} onEnter={requireAuth} />
      <Route path="category-management" component={CategoryManagementComponent} onEnter={requireAuth} />
      <Route path="in-review-courses" component={CoursesOnReviewComponent} onEnter={requireAuth} />
      <Route path="reports" onEnter={requireAuth}>
        <Route path="user-report" component={UserReportComponent} onEnter={requireAuth} />
        <Route path="courses-report" component={CoursesReportComponent} onEnter={requireAuth} />
        <Route path="course-registration-report" component={CourseRegistrationsComponent} onEnter={requireAuth} />
        <Route path="registration-report" component={TransactionsReportComponent} onEnter={requireAuth} />
        <Route path="courses-per-category-report" component={CoursesPerCategoryComponent} onEnter={requireAuth} />
        <IndexRoute component={CoursesReportComponent} onEnter={requireAuth} />
      </Route>
    </Route>
    <Route path="login" component={Login} />
    <Route path="*" component={NotFoundComponent} />
  </Router>, document.getElementById('root'));