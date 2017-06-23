import BaseGridFilterModel from './BaseGridFilterModel';

class SubcategoryFilterModel extends BaseGridFilterModel {
    getParams() {
    return {
      sort: this.orderBy,
      page: {
        size: this.displayPerPage,
        number: this.currentPage
      }
    };
  }
}

export default SubcategoryFilterModel;