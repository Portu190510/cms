import React, { Component } from 'react';
import { Textfield, Button } from 'react-mdl';
import { MDLSelectField } from 'react-mdl-select';
import _ from 'lodash';

import CourseFilterModel from '../../Models/CourseFilterModel';

class CourseSearchComponent extends Component {
  constructor(props) {
    super(props);
    this.filterCallBack = this.props.filterCallBack;
    this.filterModel = new CourseFilterModel({});
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.statusList = [
      { id: 10, name: 'Published' },
      { id: 3, name: 'Draft' },
      { id: 4, name: 'Active' },
      { id: 6, name: 'Deleted' },
      { id: 7, name: 'Pending' },
      { id: 8, name: 'Archived' },
      { id: 9, name: 'In_review' },
      { id: 12, name: 'Ready_To_Publish' }];
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
      if (key == 'courseStatus') {
        model[key] = value.state.value;
      } else {
        model[key] = value.inputRef.value
      }

    });



    this.filterCallBack(new CourseFilterModel(model));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSearchSubmit}>
          <Textfield floatingLabel ref="courseTitle" label="Course Title" />
          <Textfield floatingLabel ref="instructor" label="Instructor Name" />
          <Textfield floatingLabel ref="userIdOfInstructor" label="User Id Of Instructor" />
          <Textfield floatingLabel ref="courseId" label="Course ID" />
          <Textfield floatingLabel ref="parentCategory" label="Parent Category" />
          <Textfield floatingLabel ref="childCategory" label="Child Category" />
          <MDLSelectField
            label="Course Status"
            ref="courseStatus"
            autocomplete
            required
            floatingLabel
            onChange={() => { console.log(this.refs.parentCategory) }}
            items={this.statusList || []}
            keyField="id"
            valueField="name"
          />
          <Textfield floatingLabel ref="skills" label="Skills" />
          <Button ripple className="filter-button">
            <i className="material-icons">search</i>Search</Button>
        </form>
        <Button ripple className="filter-button" onClick={this.props.export.bind(this)}>
          <i className="material-icons">file_download</i>
          Export</Button>
      </div>

    );
  }
}

export default CourseSearchComponent;