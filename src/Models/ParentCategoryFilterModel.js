import BaseGridFilterModel from './BaseGridFilterModel';

class ParentCategoryFilterModel extends BaseGridFilterModel {
    getParams() {
    return {
      page: {
        size: this.displayPerPage,
        number: this.currentPage,
        orderBy: this.orderBy,
        sortOrder: this.sortOrder
      },
      filter: {
          level:{
              eq:1,
          }
      }
    };
  }
}

export default ParentCategoryFilterModel;