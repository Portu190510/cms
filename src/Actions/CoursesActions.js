import alt from '../Alt';
import CourseSource from '../Sources/CourseSource';

class CoursesReportActions {
  constructor() {
    this.generateActions('updateDataList');
  }

  fetchDataList(model) {
    var self = this;
    return (dispatch) => {
      dispatch();
      CourseSource
        .fetch(model)
        .then((dataList) => {
          self
            .actions
            .updateDataList(dataList);
        });
    }
  }
}

export default alt.createActions(CoursesReportActions);