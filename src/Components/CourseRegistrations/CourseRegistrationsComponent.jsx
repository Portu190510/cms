import React, { Component } from 'react';
import { Table, TableHeader, IconButton, Textfield, Button, Dialog, DialogTitle, DialogContent, DialogActions } from 'react-mdl';

import ReactPaginate from 'react-paginate';
import _ from 'lodash';

import FilterModel from '../../Models/CourseRegistrationsFilterModel';
import Store from '../../Stores/CourseRegistrationsStore';
import Actions from '../../Actions/CourseRegistrationsActions';
import connectToStores from 'alt/utils/connectToStores';

class CourseRegistrationsComponent extends Component {
    static getStores() {
        return [Store];
    }

    static getPropsFromStores() {
        return Store.getState();
    }

    componentDidMount() {
        Store.listen(this.onChange);
        Actions.fetchDataList(new FilterModel({}));
        window.componentHandler.upgradeDom();
    }

    componentWillUnmount() {
        window.componentHandler.upgradeDom();
        Store.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    constructor(props) {
        super(props);
        this.state = Store.getState();
        this.onChange = this.onChange.bind(this);
    }

    onPageChange(data) {
        var filter = this.state.filter;
        filter.currentPage = data.selected + 1;
        Actions.fetchDataList(filter);
    }

    handleOpenDialog() {
        this.setState({
            openDialog: true
        });
    }

    handleCloseDialog() {
        this.setState({
            openDialog: false
        });
    }

    sortDataList(e, orderBy) {
        var filter = this.state.filter;
        filter.sortOrder = filter.sortOrder === 'asc' ? 'desc' : 'asc';
        filter.orderBy = filter.sortOrder === 'asc' ? orderBy : '-' + orderBy;
        Actions.fetchDataList(filter);
    }

    orderByRegistrationsDataList(e, orderBy) {
        var registrationsDataList = this.state.registrationsDataList;
        var filter = this.state.registrationDetails;
        filter.sortOrder = filter.sortOrder === 'asc' ? 'desc' : 'asc';
        registrationsDataList = _.orderBy(registrationsDataList, [orderBy], [filter.sortOrder]);
        this.setState({ registrationsDataList: registrationsDataList });
        this.setState({ registrationDetails: filter });
    }

    filterDataList(e) {
        e.preventDefault();
        var model = this.state.filter;

        _.forIn(this.refs, function (value, key) {
            model[key] = value.inputRef.value
        });

        Actions.fetchDataList(model);
    }

    onCourseRegistrationDetails(course) {
        Actions.getCourseRegistrationDetails(course.release_id);
    }

    render() {
        var self = this;
        return (
            <div className="mdl-card mdl-shadow--2dp full-size">
                <h5 style={{ marginLeft: '15px' }}>Course Registrations Report</h5>
                <div className="mdl-card__supporting-text">
                    <div>
                        <form onSubmit={this.filterDataList.bind(this)}>
                            <Textfield floatingLabel ref="courseTitle" label="Course Title" />
                            <Textfield floatingLabel ref="courseId" label="Course ID" />
                            <Button ripple className="filter-button">
                                <i className="material-icons">search</i>Search</Button>
                        </form>
                    </div>
                </div>
                <div className="mdl-card__actions mdl-card--border">
                    <p style={{ marginLeft: '15px', marginBottom: "0px", opacity: "0.7" }}>Results:{this.state.filter.totalResults}</p>
                </div>
                <div className="big-table">
                    <Table className="full-size"
                        shadow={0}
                        rowKeyColumn="id"
                        rows={this.state.dataList}>
                        <TableHeader name="title" tooltip="Course Title" onClick={this.sortDataList.bind(this)}>
                            Course Title
                        </TableHeader>
                        <TableHeader name="id" tooltip="Course ID" onClick={this.sortDataList.bind(this)}>
                            Course ID
                        </TableHeader>
                        <TableHeader name="registrations_count" tooltip="Number Of Registrations" onClick={this.sortDataList.bind(this)}>
                            Number of Registrations
                        </TableHeader>
                        <TableHeader name="viewRegistrations" tooltip="View Registrations" cellFormatter={(id, course) =>
                            <Button ripple onClick={self.onCourseRegistrationDetails.bind(self, course)}>Details</Button>
                        }>
                            View Registrations
                        </TableHeader>
                    </Table>
                    <div className="pagination-box">
                        <div style={{ margin: "auto", display: "flex" }}>
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
                <Dialog open={this.state.openDialog} style={{ minWidth: "750px" }}>
                    <DialogTitle>{this.state.registrationDetails.courseName}</DialogTitle>
                    <DialogContent style={{    overflow: 'hidden',maxHeight: '673px',overflowY: 'auto'}}>
                        <Table className="full-size"
                            shadow={0}
                            rowKeyColumn="id"
                            rows={this.state.registrationsDataList}>
                            <TableHeader name="firstName" tooltip="First Name" onClick={this.orderByRegistrationsDataList.bind(this)}>
                                First Name
                        </TableHeader>
                            <TableHeader name="lastName" tooltip="Last Name" onClick={this.orderByRegistrationsDataList.bind(this)}>
                                Last Name
                        </TableHeader>
                            <TableHeader name="userId" tooltip="User ID" onClick={this.orderByRegistrationsDataList.bind(this)}>
                                User ID
                        </TableHeader>
                            <TableHeader name="registrationDate" tooltip="Registration Date" onClick={this.orderByRegistrationsDataList.bind(this)}>
                                Registration Date
                        </TableHeader>
                            <TableHeader name="lastActivityDate" tooltip="Last Activity Date" onClick={this.orderByRegistrationsDataList.bind(this)}>
                                Last Activity Date
                        </TableHeader>
                        </Table>
                    </DialogContent>
                    <DialogActions>
                        <Button type='button' onClick={this.handleCloseDialog.bind(this)}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default connectToStores(CourseRegistrationsComponent);