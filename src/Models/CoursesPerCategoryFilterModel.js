import BaseGridFilterModel from './BaseGridFilterModel';

class CoursesPerCategoryFilterModel extends BaseGridFilterModel {
  constructor(config) {
    super(config);
    this.status = '';
  }

  getParams() {
    this.start = (this.currentPage - 1) * this.displayPerPage;
    this.limit = this.displayPerPage;

    return {
      page: {
        size: this.displayPerPage,
        number: this.currentPage
      },
      filter: {
        counted_courses_status: {
          eq: this.status? this.status.toLowerCase():''
        }
      }
    };
  }
}

export default CoursesPerCategoryFilterModel;