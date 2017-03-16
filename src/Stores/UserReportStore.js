import alt from '../Alt';
import UserReportActions from '../Actions/UserReportActions';
import UserFilterModel from '../Models/UserFilterModel';
import _ from 'lodash';

class UserReportStore {
  constructor() {
    this.bindActions(UserReportActions);

    // State
    this.dataList = [];
    this.filter = new UserFilterModel({});
  }

  onFetchDataList(filterModel) {
    this.setState({ filter: filterModel });
    this.setState({ dataList: [] });
  }

  onUpdateDataList(dataList) {

    var data = dataList.map(function (item) {
      var signupSources = item.signupSources.map(function (source) {
        return source.source;
      })

      var lastLoginDates = item.signupSources.map(function (source) {
        return (new Date(source.lastLoginDateTime)).toDateString();
      });

      var signUpDateTimes = item.signupSources.map(function (source) {
        return (new Date(source.signUpDateTime)).toDateString();
      });

      return {
        userId: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        signupSource: _.join(signupSources, ', '),
        lastLoginDate: _.join(lastLoginDates, ', '),
        signupDate: _.join(signUpDateTimes, ', '),
        publisherId: item.publisherId
      }
    });

    this.setState({ dataList: data });
  }
}

export default alt.createStore(UserReportStore, 'UserReportStore');