import BaseGridFilterModel from './BaseGridFilterModel';

class CourseFilterModel extends BaseGridFilterModel {
  constructor(config) {
    super(config);
    this.courseTitle = config.courseTitle || '';
    this.instructor = config.instructor || '';
    this.userIdOfInstructor = config.userIdOfInstructor || '';
    this.courseId = config.courseId || '';
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
        reference_id: this.courseId,
        title: this.courseTitle,
        status: this.courseStatus ? this.courseStatus.toLowerCase():'',
        instructors: {
          id: this.userIdOfInstructor,
          name: this.instructor
        },
        skills: {
          label: this.skills
        },
        category: {
          label: this.parentCategory
        },
        subcategory: {
          label: this.childCategory
        },
      },
      sort:  this.orderBy,
      page: {
        size: this.limit,
        number: this.start
      }
    }
    return model;
  }
}

export default CourseFilterModel;