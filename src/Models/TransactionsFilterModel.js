import BaseGridFilterModel from './BaseGridFilterModel';

class TransactionsFilterModel extends BaseGridFilterModel {
  constructor(config) {
    super(config);
    this.learnerId = config.learnerId || '';
    this.courseId = config.courseId || '';
    this.instructorId = config.instructorId || '';
    this.fromDate = config.fromDate || null;
    this.toDate = config.toDate || null;
    this.totalResults = 0;
    this.totalRevenue = 0;
  }

  getParams() {
    return {
      page:{
        number: this.currentPage,
        size: this.displayPerPage,
        orderBy: this.orderBy,
        sortOrder: this.sortOrder
      },
      filter: {
        learner_id: this.learnerId,
        course_id: this.courseId,
        instructor_id: this.instructorId,
        created_at: {
          gte:  this.fromDate ? this.fromDate.format("M/D/Y") : '',
          lte:  this.toDate ? this.toDate.format("M/D/Y") : ''
        }
      }
    };
  }
}

export default TransactionsFilterModel;