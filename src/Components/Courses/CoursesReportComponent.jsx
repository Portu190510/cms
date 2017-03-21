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
    this.onChange = this.onChange.bind(this);
    this.filterDataList = this.filterDataList.bind(this);
  }

  onPageChange(data) {
    var filter = this.state.filter;
    filter.currentPage = data.selected + 1;
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
            sortable
            selectable
            shadow={0}
            rowKeyColumn="courseId"
            rows={this.state.dataList}>
            <TableHeader name="courseTitle" tooltip="Course Title">
              Title
          </TableHeader>
            <TableHeader name="instructor" tooltip="Instructor">
              Instructor
          </TableHeader>
            <TableHeader name="userIdOfInstructor" tooltip="User ID of Instructor">
              UserID of Instructor
          </TableHeader>
            <TableHeader
              name="courseId"
              sortFn={(a, b, isAsc) => (isAsc
                ? a
                : b).match(/\((.*)\)/)[1].localeCompare((isAsc
                  ? b
                  : a).match(/\((.*)\)/)[1])}
              tooltip="User Id">
              CourseID
          </TableHeader>
            <TableHeader name="headline" tooltip="Headline">
              Headline
          </TableHeader>
            <TableHeader name="duration" tooltip="Duration (in minutes) ">
              Duration
          </TableHeader>
            <TableHeader name="primaryParentCategory" tooltip="Primary Parent Category">
              Prim. Parent Category
          </TableHeader>
            <TableHeader name="primaryChildCategory" tooltip="Primary Child Category">
              Prim. Child Category
          </TableHeader>
            <TableHeader name="secondaryParentCategory" tooltip="Secondary Parent Category">
              Sec. Parent Category
          </TableHeader>
            <TableHeader name="secondaryChildCategory" tooltip="Secondary Child Category">
              Sec. Child Category
          </TableHeader>
            <TableHeader numeric name="courseStatus" tooltip="Course Status">
              Course Status
          </TableHeader>
            <TableHeader numeric name="lastUpdatedDate" className="date-array-field" tooltip="Last Updated Date">
              Last Updated Date
          </TableHeader>
            <TableHeader numeric name="skills" tooltip="Skills">
              Skills
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
      </div>
    );
  }
}

export default connectToStores(CoursesReportComponent);