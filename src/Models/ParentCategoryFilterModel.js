import BaseGridFilterModel from './BaseGridFilterModel';

class ParentCategoryFilterModel extends BaseGridFilterModel {
    getParams() {
    return {
      sort: this.orderBy,
      page: {
        size: this.displayPerPage,
        number: this.currentPage
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