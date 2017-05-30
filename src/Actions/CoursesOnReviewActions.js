import alt from '../Alt';
import Source from '../Sources/CoursesOnReviewSource';
import FilterModel from '../Models/CoursesOnReviewFilterModel';

class CoursesOnReviewActions {
  constructor() {
    this.generateActions('updateDataList', 'isChangeCourseStatusSuccess');
  }

  fetchDataList(model) {
    var self = this;

    Source.fetch(model.getParams())
      .then((dataList) => {
        self.actions.updateDataList(dataList);
      });

    return model;
  }

  changeCourseStatus(courseId, status) {
        var self = this;
        Source.changeStatus(courseId, status).then((response) => {
            if(response.status == 200){
                self.actions.isChangeCourseStatusSuccess(true);
                self.actions.fetchDataList(new FilterModel({}));
            }else{
                self.actions.isChangeCourseStatusSuccess(false);
            }
           
        });

        return;
    }
}

export default alt.createActions(CoursesOnReviewActions);