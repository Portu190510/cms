import alt from '../Alt';
import Source from '../Sources/CourseRegistrationsSource';
import fileDownload from 'react-file-download';

class CourseRegistrationsActions {
  constructor() {
    this.generateActions('updateDataList', "courseRegistrationDetails");
  }

  fetchDataList(model) {
    var self = this;

    Source.fetch(model.getParams())
      .then((dataList) => {
        self.actions.updateDataList(dataList);
      });

    return model;
  }

  getCourseRegistrationDetails(courseId) {
    var self = this;
    Source.getCourseRegistrationDetails(courseId)
      .then((response) => {
        self.actions.courseRegistrationDetails(response);
      });
  }
}

export default alt.createActions(CourseRegistrationsActions);