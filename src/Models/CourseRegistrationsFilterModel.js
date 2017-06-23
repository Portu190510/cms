import BaseGridFilterModel from './BaseGridFilterModel';

class CourseRegistrationsFilterModel extends BaseGridFilterModel {
  constructor(config) {
    super(config);
    this.courseId = config.courseId || '';
    this.courseTitle = config.courseTitle || '';
    this.totalResults = 0;
  }

  getParams() {
    return {
      filter: {
        id: this.courseId,
        title: this.courseTitle
      },
      sort: this.orderBy,
      page: {
        size: this.limit,
        number: this.currentPage
      }
    }
  }
}

export default CourseRegistrationsFilterModel;