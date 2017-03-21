import alt from '../Alt';
import UserSource from '../Sources/UserSource';

class UserReportActions {
  constructor() {
    this.generateActions('updateDataList');
  }

  fetchDataList(model) {
    var self = this;
 
      UserSource
        .fetch(model.getParams())
        .then((dataList) => {
          self
            .actions
            .updateDataList(dataList);
        });
    

    return model;
  }
}

export default alt.createActions(UserReportActions);