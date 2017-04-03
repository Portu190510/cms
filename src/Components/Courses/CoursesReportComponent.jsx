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
        filter.sortOrder = filter.sortOrder === 'asc' ? 'desc':'asc';
        filter.orderBy = filter.sortOrder === 'asc' ? orderBy : '-'+ orderBy;
        CoursesActions.fetchDataList(filter);
    }

  filterDataList(model) {
    CoursesActions.fetchDataList(model);
  }
  render() {
    return (
      <div className="mdl-card mdl-shadow--2dp full-size">
        <div className="mdl-card__supporting-text">
          <CourseSearchComponent filterCallBack={this.filterDataList}></CourseSearchComponent>
        </div>
        <div className="mdl-card__actions mdl-card--border"></div>
        <div className="big-table">
          <Table className="full-size"
            selectable
            onSelectionChanged={this.onSelectionChanged.bind(this)}
            shadow={0}
            rowKeyColumn="courseId"
            rows={this.state.dataList}>
            <TableHeader name="courseTitle" tooltip="Course Title" onClick={this.sortDataList.bind(this, 't_t')}>
              Title
          </TableHeader>
            <TableHeader name="instructor" tooltip="Instructor" onClick={this.sortDataList.bind(this)}>
              Instructor
          </TableHeader>
            <TableHeader name="userIdOfInstructor" tooltip="User ID of Instructor" onClick={this.sortDataList.bind(this)}>
              UserID of Instructor
          </TableHeader>
            <TableHeader
              name="courseId"
              tooltip="User Id" onClick={this.sortDataList.bind(this)}>
              CourseID
          </TableHeader>
            <TableHeader name="headline" tooltip="Headline" onClick={this.sortDataList.bind(this)}>
              Headline
          </TableHeader>
            <TableHeader name="duration" tooltip="Duration (in minutes) " onClick={this.sortDataList.bind(this)}>
              Duration
          </TableHeader>
            <TableHeader name="primaryParentCategory" tooltip="Primary Parent Category" onClick={this.sortDataList.bind(this)}>
              Prim. Parent Category
          </TableHeader>
            <TableHeader name="primaryChildCategory" tooltip="Primary Child Category" onClick={this.sortDataList.bind(this)}>
              Prim. Child Category
          </TableHeader>
            <TableHeader name="secondaryParentCategory" tooltip="Secondary Parent Category" onClick={this.sortDataList.bind(this)}>
              Sec. Parent Category
          </TableHeader>
            <TableHeader name="secondaryChildCategory" tooltip="Secondary Child Category" onClick={this.sortDataList.bind(this)}>
              Sec. Child Category
          </TableHeader>
            <TableHeader numeric name="courseStatus" tooltip="Course Status" onClick={this.sortDataList.bind(this)}>
              Course Status
          </TableHeader>
            <TableHeader numeric name="lastUpdatedDate" className="date-array-field" tooltip="Last Updated Date" onClick={this.sortDataList.bind(this)}>
              Last Updated Date
          </TableHeader>
            <TableHeader numeric name="skills" tooltip="Skills" onClick={this.sortDataList.bind(this)}>
              Skills
          </TableHeader>
          </Table>
          <div className="pagination-box">
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
    );
  }
}

export default connectToStores(CoursesReportComponent);