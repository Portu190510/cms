import BaseGridFilterModel from './BaseGridFilterModel';

function jsonToQueryString(obj, prefix) {
  var str = [], p;
  for(p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        jsonToQueryString(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

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

  getParamsString(){
    this.start = this.currentPage;
    this.limit = this.displayPerPage;

    var model =  { 
      filter : {
      status: { eq:this.courseStatus},
      primary_category_id : {eq:this.parentCategory}
    },
    sort:this.orderBy,
    page:{
      size:this.limit,
      number:this.start
    } 
  }
    return  jsonToQueryString(model);
  }
}

export default CourseFilterModel;