import alt from '../Alt';
import CourseSource from '../Sources/CourseSource';

class CoursesReportActions {
  constructor() {
    this.generateActions('updateDataList');
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
}

export default alt.createActions(CoursesReportActions);