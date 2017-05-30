import BaseGridFilterModel from './BaseGridFilterModel';

class CourseFilterModel extends BaseGridFilterModel {
  constructor(config) {
    super(config);
    this.courseTitle = config.courseTitle || '';
    this.instructor = config.instructor || '';
    this.userIdOfInstructor = config.userIdOfInstructor || null;
    this.courseId = config.courseId || null;
    this.parentCategory = config.parentCategory || '';
    this.childCategory = config.childCategory || '';
    this.courseStatus = config.courseStatus || '';
    this.skills = config.skills || '';
  }

  getParams() {
    this.start = this.currentPage;
    this.limit = this.displayPerPage;

    var model = {
      filter: {
        status: { eq: this.courseStatus },
        primary_category_id: { eq: this.parentCategory }
      },
      sort: this.orderBy,
      page: {
        size: this.limit,
        number: this.start
      }
    }
    return model;
  }
}

export default CourseFilterModel;