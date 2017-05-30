import BaseGridFilterModel from './BaseGridFilterModel';

class CourseRegistrationsFilterModel extends BaseGridFilterModel {
  constructor(config) {
    super(config);
    this.courseId = config.courseId || '';
    this.courseTitle = config.courseTitle || '';
    this.totalResults = 0;
  }

  getParams() {
    this.start = (this.currentPage - 1) * this.displayPerPage;
    this.limit = this.displayPerPage;

    return {
      start: this.start, 
      limit: this.limit,
      courseId: this.courseId,
      courseTitle: this.courseTitle,
      orderBy:this.orderBy,
      sortOrder: this.sortOrder
    };
  }
}

export default CourseRegistrationsFilterModel;