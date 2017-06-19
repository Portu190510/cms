import React, { Component } from 'react';
import { Table, TableHeader, IconButton, Snackbar } from 'react-mdl';
import ReactPaginate from 'react-paginate';

import UserSearchComponent from "./UserSearchComponent";
import UserFilterModel from '../../Models/UserFilterModel';
import UserReportActions from '../../Actions/UserReportActions';
import UserReportStore from '../../Stores/UserReportStore';
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

  sortDataList(e, orderBy) {
    var filter = this.state.filter;
    filter.orderBy = orderBy;
    filter.sortOrder = filter.sortOrder === 'asc' ? 'desc' : 'asc';
    UserReportActions.fetchDataList(filter);
  }

  onSelectionChanged(data) {
    this.selectedDomains = data;
  }


  onExportToCsv() {
    UserReportActions.exportToCsv(this.selectedDomains);
  }

  handleTimeoutSnackbar() {
    this.setState({ isSnackbarActive: false });
  }

  render() {
    return (
      <div className="mdl-card mdl-shadow--2dp full-size">
      <h5 style={{ marginLeft: '15px' }}>Users Report</h5>
        <div className="mdl-card__supporting-text">
          <UserSearchComponent filterCallBack={this.filterDataList} onExportCallBack={this.onExportToCsv.bind(this)}></UserSearchComponent>
        </div>
        <div className="mdl-card__actions mdl-card--border"></div>
        <div className="big-table">
          <Table className="full-size date-array-field"
            selectable
            shadow={0}
            rowKeyColumn="userId"
            onSelectionChanged={this.onSelectionChanged.bind(this)}
            rows={this.state.dataList}>
            <TableHeader name="userId" numeric tooltip="User Id" onClick={this.sortDataList.bind(this)}>
              User ID
          </TableHeader>
            <TableHeader name="firstName" tooltip="First Name" onClick={this.sortDataList.bind(this)}>
              First Name
          </TableHeader>
            <TableHeader name="lastName" tooltip="Last Name" onClick={this.sortDataList.bind(this)}>
              Last Name
          </TableHeader>
            <TableHeader name="email" tooltip="Email" onClick={this.sortDataList.bind(this)}>
              Email
          </TableHeader>
            <TableHeader name="signupSource" tooltip="Signup Source" onClick={this.sortDataList.bind(this)}>
              Signup Source
          </TableHeader>
            <TableHeader name="lastLoginDate" className="date-array-field" tooltip="Last Login Date" onClick={this.sortDataList.bind(this)}>
              Last Login Date
          </TableHeader>
            <TableHeader name="signupDate" className="date-array-field" tooltip="Signup Date" onClick={this.sortDataList.bind(this)}>
              Signup Date
          </TableHeader>
          </Table>
          <div className="pagination-box">
            <div style={{margin: "auto",display: "flex"}}>
            <ReactPaginate containerClassName="pagination" pageCount={this.state.filter.totalPages}
              previousLabel={<IconButton name="keyboard_arrow_left" />}
              nextLabel={<IconButton name="keyboard_arrow_right" />}
              breakLabel={<span className="ellipsis">...</span>}
              pageNum={this.state.filter.currentPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              pageLinkClassName="mdl-button mdl-js-button mdl-button--icon"
              perPage={this.state.filter.displayPerPage}
              onPageChange={this.onPageChange.bind(this)}>
            </ReactPaginate >
            </div>
          </div>
        </div>
        <Snackbar active={this.state.isSnackbarActive} onTimeout={this.handleTimeoutSnackbar.bind(this)}> Export error!
          </Snackbar>
      </div>
    );
  }
}

export default connectToStores(UserGridComponent);