import React, { Component } from 'react';
import { Textfield, Button } from 'react-mdl';
import _ from 'lodash';

import UserFilterModel from '../../Models/UserFilterModel';

class UserSearchComponent extends Component {
  constructor(props) {
    super(props);
    this.filterCallBack = this.props.filterCallBack;
    this.filterModel = new UserFilterModel({});
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  componentDidMount() {
    window.componentHandler.upgradeDom();
  }

  componentWillUnmount() {
    window.componentHandler.upgradeDom();
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
    this.filterCallBack(new UserFilterModel(model));
  }

  clearFilter(){
     _.forIn(this.refs, function (value, key) {
      value.inputRef.value = '';
    });
    this.props.clearFilter();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSearchSubmit}>
          <Textfield floatingLabel ref="firstName" label="First Name" />
          <Textfield floatingLabel ref="lastName" label="Last Name" />
          <Textfield floatingLabel ref="userId" label="User Id" />
          <Textfield floatingLabel ref="email" label="Email" />
          <Button ripple className="filter-button">
            <i className="material-icons">search</i>Search</Button>
        </form>
        <Button ripple onClick={this.clearFilter.bind(this)} className="filter-button">
            <i className="material-icons">clear</i>Clear Search</Button>
        <Button ripple onClick={this.props.onExportCallBack} className="filter-button">
          <i className="material-icons">file_download</i>
          Export</Button>
      </div>
    );
  }
}

export default UserSearchComponent;