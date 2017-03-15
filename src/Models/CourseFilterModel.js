 class CourseFilterModel {
    constructor(config){
       this.courseTitle = config.courseTitle || '';
       this.instructor = config.instructor || '';
       this.userIdOfInstructor = config.userIdOfInstructor || null;
       this.courseId = config.courseId || null;
       this.parentCategory = config.parentCategory || '';
       this.childCategory = config.childCategory || '';
       this.courseStatus = config.courseStatus || '';
       this.skills = config.skills || '';
    }
}

export default CourseFilterModel;