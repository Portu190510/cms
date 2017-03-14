import React, {Component} from 'react';
import {Table, TableHeader} from 'react-mdl';
import UserSearchComponent from "./UserSearchComponent";

import UserReportStore from '../Stores/UserReportStore';
import UserReportActions from '../Actions/UserReportActions';
import connectToStores from 'alt/utils/connectToStores';

class UserGridComponent extends Component {
  static getStores() {
    return [UserReportStore];
  }

  static getPropsFromStores() {
    return UserReportStore.getState();
  }

  componentDidMount() {
    UserReportStore.listen(this.onChange);
    UserReportActions.fetchDataList();
    window.componentHandler.upgradeDom();
  }

  componentWillUnmount() {
    window.componentHandler.upgradeDom();
    UserReportStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  constructor(props) {
    super(props);
    this.state = UserReportStore.getState();
    this.onChange = this.onChange.bind(this);
    this.filterDataList = this.filterDataList.bind(this);
  }

  nextPage() {}

  filterDataList(model) {
    UserReportActions.filterDataList(model);
  }

  render() {
    return (
      <div className="mdl-card mdl-shadow--2dp" style={{  width: '100%' }}>
        <div className="mdl-card__supporting-text">
          <UserSearchComponent filterCallBack={this.filterDataList}></UserSearchComponent>
        </div>
        <div className="mdl-card__actions mdl-card--border"></div>
        <Table
          style={{
          width: '100%'
        }}
          sortable
          selectable
          shadow={0}
          rowKeyColumn="userId"
          rows={this.state.dataList}>
          <TableHeader
            name="userId"
            sortFn={(a, b, isAsc) => (isAsc
            ? a
            : b).match(/\((.*)\)/)[1].localeCompare((isAsc
            ? b
            : a).match(/\((.*)\)/)[1])}
            tooltip="User Id">
            User ID
          </TableHeader>
          <TableHeader name="firstName" tooltip="FirstName">
            FirstName
          </TableHeader>
          <TableHeader name="lastName" tooltip="LastName">
            LastName
          </TableHeader>
          <TableHeader name="email" tooltip="Email">
            Email
          </TableHeader>
          <TableHeader name="signupSource" tooltip="SignupSource">
            SignupSource
          </TableHeader>
          <TableHeader name="lastLoginDate" tooltip="LastLoginDate">
            LastLoginDate
          </TableHeader>
          <TableHeader name="signupDate" tooltip="SignupDate">
            SignupDate
          </TableHeader>
          <TableHeader numeric name="publisherId" tooltip="Publisher Id">
            PublisherId
          </TableHeader>
        </Table>
      </div>
    );
  }
}

export default connectToStores(UserGridComponent);