import React, { Component } from 'react';
import { Textfield, Button } from 'react-mdl';
import _ from 'lodash';

import CourseFilterModel from '../../Models/CourseFilterModel';

class CourseSearchComponent extends Component {
  constructor(props) {
    super(props);
    this.filterCallBack = this.props.filterCallBack;
    this.filterModel = new CourseFilterModel({});
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
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

    _.forIn(this.refs, function (value, key) {
      model[key] = value.inputRef.value
    });

    this.filterCallBack(new CourseFilterModel(model));
  }

  render() {
    return (
      <form onSubmit={this.onSearchSubmit}>
        <Textfield floatingLabel ref="courseTitle" label="Course Title" />
        <Textfield floatingLabel ref="instructor" label="Instructor" />
        <Textfield floatingLabel ref="userIdOfInstructor" label="User Id Of Instructor" />
        <Textfield floatingLabel ref="courseId" label="Course ID" />
        <Textfield floatingLabel ref="parentCategory" label="Parent Category" />
        <Textfield floatingLabel ref="childCategory" label="Child Category" />
        <Textfield floatingLabel ref="courseStatus" label="Course Status" />
        <Textfield floatingLabel ref="skills" label="Skills" />
        <Button ripple className="filter-button">
          <i className="material-icons">search</i>Search</Button>
        <Button ripple className="filter-button">
          <i className="material-icons">file_download</i>
          Export</Button>
      </form>
    );
  }
}

export default CourseSearchComponent;