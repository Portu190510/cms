import React, {Component} from 'react';
import {Textfield, Button} from 'react-mdl';

class UserSearchComponent extends Component {
  constructor(props) {
    super(props);
    this.filterCallBack = this.props.filterCallBack;
    this.filterModel = {
      FirstName: '',
      LastName: '',
      UserId: '',
      Email: ''
    };
    this.onSearchSubmit = this
      .onSearchSubmit
      .bind(this);
  }

  componentDidMount() {
    window.componentHandler.upgradeDom();
  }

  componentWillUnmount() {
    window
      .componentHandler
      .upgradeDom();
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
    for (var key in this.refs) {
      model[key] = this.refs[key].value;
    }

    this.filterCallBack(model);
  }

  render() {
    return (
      <form onSubmit={this.onSearchSubmit}><div className="mdl-textfield mdl-js-textfield">
          <Textfield
            ref="FirstName"
            label="FirstName"
            style={{
            width: '250px'
          }}/>
        </div>
        <div className="mdl-textfield mdl-js-textfield">
          <Textfield
            ref="LastName"
            label="LastName"
            style={{
            width: '250px'
          }}/>
        </div>
        <div className="mdl-textfield mdl-js-textfield">
          <Textfield
            ref="UserId"
            label="UserId"
            style={{
            width: '250px'
          }}/>
        </div>
        <div className="mdl-textfield mdl-js-textfield">
          <Textfield
            ref="Email"
            label="Email"
            style={{
            width: '250px'
          }}/>
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

export default UserSearchComponent;