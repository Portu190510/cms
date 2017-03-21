import React, { Component } from 'react';
import { Table, TableHeader, IconButton } from 'react-mdl';
import UserSearchComponent from "./UserSearchComponent";
import UserFilterModel from '../../Models/UserFilterModel';

import UserReportStore from '../../Stores/UserReportStore';
import UserReportActions from '../../Actions/UserReportActions';
import connectToStores from 'alt/utils/connectToStores';
import ReactPaginate from 'react-paginate';
//import Pagination from '../Common/PaginationExample';
//import Pagination from 'pagination-material-ui';



class UserGridComponent extends Component {
  static getStores() {
    return [UserReportStore];
  }

  static getPropsFromStores() {
    return UserReportStore.getState();
  }

  componentDidMount() {
    UserReportStore.listen(this.onChange);
    UserReportActions.fetchDataList(new UserFilterModel({}));
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

  onPageChange(data) {
    var filter = this.state.filter;
    filter.currentPage = data.selected + 1;
    UserReportActions.fetchDataList(filter);
  }

  filterDataList(filter) {
    UserReportActions.fetchDataList(filter);
  }

  sortDataList(isAsc, orderBy){
    var filter = this.state.filter;
    filter.sortOrder = isAsc ? 'asc':'desc';
    UserReportActions.fetchDataList(filter);
  }

  render() {
    return (
      <div className="mdl-card mdl-shadow--2dp full-size">
        <div className="mdl-card__supporting-text">
          <UserSearchComponent filterCallBack={this.filterDataList}></UserSearchComponent>
        </div>
        <div className="mdl-card__actions mdl-card--border"></div>
        <Table className="full-size date-array-field"
          sortable
          selectable
          shadow={0}
          rowKeyColumn="userId"
          rows={this.state.dataList}>
          <TableHeader name="userId" tooltip="User Id">
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
          <TableHeader name="lastLoginDate" className="date-array-field" tooltip="LastLoginDate">
            LastLoginDate
          </TableHeader>
          <TableHeader name="signupDate" className="date-array-field" tooltip="SignupDate">
            SignupDate
          </TableHeader>
          <TableHeader numeric name="publisherId" tooltip="Publisher Id">
            PublisherId
          </TableHeader>
        </Table>
        <div className="pagination-box">
          <ReactPaginate containerClassName="pagination" total={this.state.totalPages}
            previousLabel={<IconButton name="keyboard_arrow_left" />}
            nextLabel={<IconButton name="keyboard_arrow_right" />}
            breakLabel={<span className="ellipsis">...</span>}
            pageNum={this.state.current}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            pageLinkClassName="mdl-button mdl-js-button mdl-button--icon"
            perPage={this.state.displayPerPage}
            onPageChange={this.onPageChange.bind(this)}>
          </ReactPaginate >
        </div>
      </div>
    );
  }
}

export default connectToStores(UserGridComponent);