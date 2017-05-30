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
      start: this.start, 
      limit: this.limit,
      status: this.status
    };
  }
}

export default CoursesPerCategoryFilterModel;