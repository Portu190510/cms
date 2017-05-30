import BaseGridFilterModel from './BaseGridFilterModel';

class CoursesOnReviewFilterModel extends BaseGridFilterModel {
  constructor(config) {
    super(config);
    this.totalResults = 0;
    this.title = config.title || '';
    this.instructorIdOrName = config.instructorIdOrName || '';
  }

  getParams() {
    this.start = (this.currentPage - 1) * this.displayPerPage;
    this.limit = this.displayPerPage;

    return {
      start: this.start, 
      limit: this.limit,
      title: this.title,
      instructorIdOrName: this.instructorIdOrName
    };
  }
}

export default CoursesOnReviewFilterModel;