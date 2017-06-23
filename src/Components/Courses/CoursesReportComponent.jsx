import React, { Component } from 'react';
import { Table, TableHeader, IconButton } from 'react-mdl';
import CourseSearchComponent from "./CourseSearchComponent";
import CourseFilterModel from '../../Models/CourseFilterModel';

import CoursesStore from '../../Stores/CoursesStore';
import CoursesActions from '../../Actions/CoursesActions';
import connectToStores from 'alt/utils/connectToStores';
import ReactPaginate from 'react-paginate';

class CoursesReportComponent extends Component {
  static getStores() {
    return [CoursesStore];
  }

  static getPropsFromStores() {
    return CoursesStore.getState();
  }

  componentDidMount() {
    CoursesStore.listen(this.onChange);
    CoursesActions.fetchDataList(new CourseFilterModel({}));
    window.componentHandler.upgradeDom();
  }

  componentWillUnmount() {
    window.componentHandler.upgradeDom();
    CoursesStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  constructor(props) {
    super(props);
    this.state = CoursesStore.getState();
    this.selectedDomains = [];
    this.onChange = this.onChange.bind(this);
    this.filterDataList = this.filterDataList.bind(this);
  }

  onPageChange(data) {
    var filter = this.state.filter;
    filter.currentPage = data.selected + 1;
    CoursesActions.fetchDataList(filter);
  }

  onSelectionChanged(data) {
    this.selectedDomains = data;
  }

  sortDataList(e, orderBy, t) {
    var filter = this.state.filter;
    filter.sortOrder = filter.sortOrder === 'asc' ? 'desc' : 'asc';
    filter.orderBy = filter.sortOrder === 'asc' ? orderBy : '-' + orderBy;
    CoursesActions.fetchDataList(filter);
  }

  filterDataList(model) {
    CoursesActions.fetchDataList(model);
  }

  export() {
    CoursesActions.exportToCsv(this.selectedDomains);
  }

  render() {
    return (
      <div className="mdl-card mdl-shadow--2dp full-size">
      <h5 style={{ marginLeft: '15px' }}>Course Catalog</h5>
        <div className="mdl-card__supporting-text">
          <CourseSearchComponent filterCallBack={this.filterDataList} export={this.export.bind(this)}></CourseSearchComponent>
        </div>
        <div className="mdl-card__actions mdl-card--border"></div>
        <div className="big-table table-scroll" style={{height: '630px'}}>
          <Table className="full-size date-array-field"
            selectable
            onSelectionChanged={this.onSelectionChanged.bind(this)}
            shadow={0}
            rowKeyColumn="id"
            rows={this.state.dataList}>
            <TableHeader name="title" tooltip="Course Title" onClick={this.sortDataList.bind(this)}>
              Title
          </TableHeader>
            <TableHeader name="instructor" tooltip="Instructor">
              Instructor
          </TableHeader>
            <TableHeader name="userIdOfInstructor" tooltip="User ID of Instructor" >
              UserID of Instructor
          </TableHeader>
            <TableHeader
              name="id"
              tooltip="User Id" onClick={this.sortDataList.bind(this)}>
              Course ID
          </TableHeader>
            <TableHeader name="headline" tooltip="Headline" onClick={this.sortDataList.bind(this)}>
              Headline
          </TableHeader>
            <TableHeader name="duration_sec" tooltip="Duration (in minutes) " onClick={this.sortDataList.bind(this)}>
              Duration
          </TableHeader>
            <TableHeader name="primary_category" tooltip="Primary Parent Category">
              Prim. Parent Category
          </TableHeader>
            <TableHeader name="primary_subcategory" tooltip="Primary Child Category" >
              Prim. Child Category
          </TableHeader>
            <TableHeader name="secondary_category" tooltip="Secondary Parent Category" >
              Sec. Parent Category
          </TableHeader>
            <TableHeader name="secondary_subcategory" tooltip="Secondary Child Category">
              Sec. Child Category
          </TableHeader>
            <TableHeader name="status" tooltip="Course Status" onClick={this.sortDataList.bind(this)}>
              Course Status
          </TableHeader>
            <TableHeader name="updated" className="date-array-field" tooltip="Last Updated Date" onClick={this.sortDataList.bind(this)}>
              Last Updated Date
          </TableHeader>
            <TableHeader style={{whiteSpace:'initial'}} name="skills" tooltip="Skills">
              Skills
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
      </div>
    );
  }
}

export default connectToStores(CoursesReportComponent);