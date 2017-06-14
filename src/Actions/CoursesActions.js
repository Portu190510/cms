import alt from '../Alt';
import CourseSource from '../Sources/CourseSource';
import fileDownload from 'react-file-download';

class CoursesReportActions {
  constructor() {
    this.generateActions('updateDataList', 'exportSuccess');
  }

  fetchDataList(model) {
    var self = this;
      CourseSource
        .fetch(model.getParams())
        .then((dataList) => {
          self
            .actions
            .updateDataList(dataList);
        });
    
    return model
  }

  exportToCsv(idArray) {
    var self = this;
    CourseSource.exportToCsv(idArray)
      .then((csvByteArray) => {
        if (csvByteArray) {
          fileDownload(csvByteArray, 'courseReport.csv');
          self.actions.exportSuccess(true);
        } else {
          console.log('csv is empty');
          self.actions.exportSuccess(false);
        }
      });
  }
}

export default alt.createActions(CoursesReportActions);