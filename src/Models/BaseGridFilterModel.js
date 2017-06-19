class BaseGridFilterModel {
  constructor(config) {
    this.totalPages = 1;
    this.currentPage = 1;
    this.displayPerPage = 50;
    this.orderBy = '';
    this.sortOrder = 'desc';
    this.start = 0;
    this.limit = 50;
  }

  getParams() {
    this.start = (this.currentPage - 1) * this.displayPerPage;
    this.limit = this.displayPerPage;

    return { start: this.start, limit: this.limit, orderBy: this.orderBy, sortOrder: this.sortOrder };
  }
}

export default BaseGridFilterModel;