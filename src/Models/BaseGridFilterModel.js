class BaseGridFilterModel {
  constructor() {
    this.totalPages = 1;
    this.currentPage = 1;
    this.displayPerPage = 50;
    this.sortOrder = 'desc';
  }
}

export default BaseGridFilterModel;