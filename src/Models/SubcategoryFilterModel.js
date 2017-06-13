import BaseGridFilterModel from './BaseGridFilterModel';

class SubcategoryFilterModel extends BaseGridFilterModel {
    getParams() {
    return {
      page: {
        size: this.displayPerPage,
        number: this.currentPage,
        orderBy: this.orderBy,
        sortOrder: this.sortOrder
      }
    };
  }
}

export default SubcategoryFilterModel;