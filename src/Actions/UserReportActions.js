import alt from '../Alt';
import UserSource from '../Sources/UserSource';
import fileDownload from 'react-file-download';

class UserReportActions {
  constructor() {
    this.generateActions('updateDataList', 'exportSuccess');
  }

  fetchDataList(model) {
    var self = this;

    UserSource.fetch(model.getParams())
      .then((dataList) => {
        self.actions.updateDataList(dataList);
      });

    return model;
  }

  exportToCsv(userIdArray) {
    var self = this;
    UserSource.exportToCsv(userIdArray)
      .then((csvByteArray) => {
        if (csvByteArray) {
          fileDownload(csvByteArray, 'userReport.csv');
          self.actions.exportSuccess(true);
        } else {
          console.log('csv is empty');
          self.actions.exportSuccess(false);
        }
      });
  }
}

export default alt.createActions(UserReportActions);