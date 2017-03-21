class BaseGridFilterModel {
  constructor() {
    this.totalPages = 1;
    this.currentPage = 1;
    this.displayPerPage = 50;
    this.orderBy = '';
    this.sortOrder = 'asc';
  }
}

export default BaseGridFilterModel;