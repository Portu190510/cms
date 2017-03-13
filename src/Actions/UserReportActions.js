import alt from '../Alt';
import UserSource from '../Sources/UserSource';

class UserReportActions {
  constructor() {
    this.generateActions('filterDataList', 'updateDataList');
  }

  fetchDataList() {
    var self = this;
    return (dispatch) => {
      dispatch();
      UserSource
        .fetch()
        .then((dataList) => {
          self
            .actions
            .updateDataList(dataList);
        });
    }
  }
}

export default alt.createActions(UserReportActions);