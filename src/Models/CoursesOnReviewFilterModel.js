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
      page: {
        number: this.currentPage,
        size: this.displayPerPage,
        orderBy: this.orderBy,
        sortOrder: this.sortOrder
      },
      filter: {
        title: this.title,
        instructors: {
          name_or_id: this.instructorIdOrName
        }
      }
    };
  }
}

export default CoursesOnReviewFilterModel;