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
      sort: this.orderBy,
      page: {
        size: this.displayPerPage,
        number: this.currentPage,
        orderBy: this.orderBy,
        sortOrder: this.sortOrder
      },
      filter: {
        reference_id: this.courseId,
        course_title: this.courseTitle
      }
    };
  }
}

export default CourseRegistrationsFilterModel;