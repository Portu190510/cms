import BaseGridFilterModel from './BaseGridFilterModel';

class UserFilterModel extends BaseGridFilterModel {
  constructor(config) {
    super(config);
    this.firstName = config.firstName || '';
    this.lastName = config.lastName || '';
    this.userId = config.userId || null;
    this.email = config.email || '';
  }
}

export default UserFilterModel;