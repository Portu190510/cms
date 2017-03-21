import alt from '../Alt';
import _ from 'lodash';
import CoursesActions from '../Actions/CoursesActions';
import CourseFilterModel from '../Models/CourseFilterModel';

class CoursesStore {
  constructor() {
    this.bindActions(CoursesActions);

    // State
    this.dataList = [];
    this.filter = new CourseFilterModel({});
  }

  onFetchDataList(filterModel) {
    this.setState({ filter: filterModel });
    this.setState({ dataList: [] });
  }

  onUpdateDataList(dataList) {
    var data = dataList.map(function (item) {
      var lastUpdatedDates = item.signupSources.map(function (source) {
        return (new Date(source.lastUpdatedDate)).toLocaleDateString('en-US');
      });

      return {
        courseId: item.courseId,
        courseTitle: item.courseTitle,
        instructor: item.instructor,
        userIdOfInstructor: item.userIdOfInstructor,
        duration: item.duration,
        headline: item.headline,
        primaryParentCategory: item.primaryParentCategory,
        primaryChildCategory: item.primaryChildCategory,
        secondaryParentCategory: item.secondaryParentCategory,
        secondaryChildCategory: item.secondaryChildCategory,
        courseStatus: item.courseStatus,
        lastUpdatedDate: _.join(lastUpdatedDates, '\n  '),
        skills: _.join(item.skills, ', ')
      }
    });
    this.setState({ dataList: data });
  }
}

export default alt.createStore(CoursesStore, 'CoursesStore');