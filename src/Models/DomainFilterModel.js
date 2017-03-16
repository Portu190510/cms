import BaseGridFilterModel from './BaseGridFilterModel';

class DomainFilterModel extends BaseGridFilterModel {
  constructor(config) {
    super(config);
    this.start = 0;
    this.limit = 50;
  }

  getParams() {
    this.start = (this.currentPage - 1) * this.displayPerPage;
    this.limit = this.displayPerPage;

    return { start: this.start, limit: this.limit };
  }
}

export default DomainFilterModel;