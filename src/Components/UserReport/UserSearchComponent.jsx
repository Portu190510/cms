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

  render() {
    return (
      <form onSubmit={this.onSearchSubmit}>
        <Textfield floatingLabel ref="firstName" label="FirstName" />
        <Textfield floatingLabel ref="lastName" label="LastName" />
        <Textfield floatingLabel ref="userId" label="UserId" />
        <Textfield floatingLabel ref="email" label="Email" />
        <Button ripple className="filter-button">
          <i className="material-icons">search</i>Search</Button>
        <Button ripple className="filter-button">
          <i className="material-icons">file_download</i>
          Export</Button>
      </form>
    );
  }
}

export default UserSearchComponent;