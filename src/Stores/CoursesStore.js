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

  onUpdateDataList(response) {
    if(response && response.data){
    var data = response.data.map(function (item) {
      var attributes = item.attributes;
      var lastUpdatedDates = (new Date(attributes.updated)).toLocaleDateString('en-US');

      return {
        courseId: item.id,
        courseTitle: attributes.title,
        instructor: 'TODO',
        userIdOfInstructor: _.join(attributes['instructor-ids'], '\n  '),
        duration: (attributes['duration-sec']/ 60) + 'min.',
        headline: attributes.headline,
        primaryParentCategory: attributes['primary-category-id'],
        primaryChildCategory: attributes['primary-subcategory-id'],
        secondaryParentCategory: attributes['secondary-category-id'],
        secondaryChildCategory: attributes['secondary-subcategory-id'],
        courseStatus: attributes.status,
        lastUpdatedDate: _.join(lastUpdatedDates, '\n  '),
        skills: _.join(attributes['skill-ids'], ', ')
      }
    });

    var filterModel = this.filter;
    //TODO
    if(response.links.last)
    {
      filterModel.totalPages = +(response.links.last.substring(response.links.last.indexOf("page%5Bnumber%5D=") + 17, response.links.last.indexOf("&page%5Bsize%5D")));
    }
    this.setState({ filter: filterModel });

    this.setState({ dataList: data });
  }
  console.log("NO RESPONSE");
  }
}

export default alt.createStore(CoursesStore, 'CoursesStore');