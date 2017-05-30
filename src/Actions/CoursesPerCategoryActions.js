import alt from '../Alt';
import Source from '../Sources/CoursesPerCategorySource';
import FilterModel from '../Models/CoursesPerCategoryFilterModel';

class CoursesPerCategoryActions {
  constructor() {
    this.generateActions('updateDataList');
  }

  fetchDataList(model) {
    var self = this;

    Source.fetch(model.getParams())
      .then((dataList) => {
        self.actions.updateDataList(dataList);
      });

    return model;
  }
}

export default alt.createActions(CoursesPerCategoryActions);