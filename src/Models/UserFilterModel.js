import BaseGridFilterModel from './BaseGridFilterModel';

class UserFilterModel extends BaseGridFilterModel {
  constructor(config) {
    super(config);
    this.firstName = config.firstName || '';
    this.lastName = config.lastName || '';
    this.userId = config.userId || null;
    this.email = config.email || '';
    this.start = 0;
    this.limit = 50;
  }

  getParams() {
    this.start = (this.currentPage - 1) * this.displayPerPage;
    this.limit = this.displayPerPage;

    return {
      start: this.start, 
      limit: this.limit,
      firstName: this.firstName,
      lastName: this.lastName,
      userId: this.userId,
      email: this.email,
      orderBy:this.orderBy,
      sortOrder: this.sortOrder
    };
  }
}

export default UserFilterModel;