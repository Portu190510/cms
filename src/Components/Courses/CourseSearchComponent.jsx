import React, {Component} from 'react';
import CourseFilterModel from '../../Models/CourseFilterModel';
import {Textfield, Button} from 'react-mdl';
import _ from 'lodash';

class CourseSearchComponent extends Component {
  constructor(props) {
    super(props);
    this.filterCallBack = this.props.filterCallBack;
    this.filterModel = new CourseFilterModel({});
    this.onSearchSubmit = this
      .onSearchSubmit
      .bind(this);
  }

  validateField(fieldValue) {
    if (fieldValue && fieldValue.length > 0) {
      return true;
    }

    return false;
  }

  onSearchSubmit(e) {
    e.preventDefault();
    var model = {};
    
    _.forIn(this.refs, function(value, key) {
          model[key] = value.inputRef.value
    });

    this.filterCallBack(new CourseFilterModel(model));
  }

  render() {
    return (
      <form onSubmit={this.onSearchSubmit}>
        <div className="mdl-textfield mdl-js-textfield">
          <Textfield ref="courseTitle" label="Course Title"/>
        </div>
        <div className="mdl-textfield mdl-js-textfield">
          <Textfield ref="instructor" label="Instructor"/>
        </div>
        <div className="mdl-textfield mdl-js-textfield">
          <Textfield ref="userIdOfInstructor" label="User Id Of Instructor"/>
        </div>
        <div className="mdl-textfield mdl-js-textfield">
          <Textfield ref="courseId" label="Course ID"/>
        </div>
        <div className="mdl-textfield mdl-js-textfield">
          <Textfield ref="parentCategory" label="Parent Category"/>
        </div>
        <div className="mdl-textfield mdl-js-textfield">
          <Textfield ref="childCategory" label="Child Category"/>
        </div>
        <div className="mdl-textfield mdl-js-textfield">
          <Textfield ref="courseStatus" label="Course Status"/>
        </div>
        <div className="mdl-textfield mdl-js-textfield">
          <Textfield ref="skills" label="Skills"/>
        </div>
        <Button ripple>
          <i className="material-icons">search</i>Search</Button>
        <Button ripple>
          <i className="material-icons">file_download</i>
          Export to CSV</Button>
      </form>
    );
  }
}

export default CourseSearchComponent;