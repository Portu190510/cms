import alt from '../Alt';
import UserReportActions from '../Actions/UserReportActions';
import UserFilterModel from '../Models/UserFilterModel';
import _ from 'lodash';

class UserReportStore {
  constructor() {
    this.bindActions(UserReportActions);

    // State
    this.isSnackbarActive = false;
    this.dataList = [];
    this.filter = new UserFilterModel({});
  }

  onExportSuccess(isSuccess) {
    if (!isSuccess) {
      this.isSnackbarActive = true;
    }
  }

  onFetchDataList(filterModel) {
    this.setState({ filter: filterModel });
    this.setState({ dataList: [] });
  }

  onUpdateDataList(response) {
    var filterModel = this.filter;
    filterModel.totalPages = response.totalPage;
    this.setState({ filter: filterModel });

    var data = response.map(function (item) {
      var signupSources = item.signupSources.map(function (source) {
        return source.source;
      })

      var lastLoginDates = item.signupSources.map(function (source) {
        return (new Date(source.lastLoginDateTime)).toLocaleDateString('en-US');
      });

      var signUpDateTimes = item.signupSources.map(function (source) {
        return (new Date(source.signUpDateTime)).toLocaleDateString('en-US');
      });

      return {
        userId: item.userId,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        signupSource: _.join(signupSources, '\n '),
        lastLoginDate: _.join(lastLoginDates, '\n  '),
        signupDate: _.join(signUpDateTimes, '\n '),
        publisherId: item.publisherId
      }
    });

    this.setState({ dataList: data });
  }
}

export default alt.createStore(UserReportStore, 'UserReportStore');