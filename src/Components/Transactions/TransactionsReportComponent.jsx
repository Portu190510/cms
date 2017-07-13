import React, { Component } from 'react';
import { Table, TableHeader, IconButton, Textfield, Button, Snackbar } from 'react-mdl';
import { DateRangePicker } from 'react-dates';

import 'react-dates/lib/css/_datepicker.css';

import ReactPaginate from 'react-paginate';
import _ from 'lodash';

import FilterModel from '../../Models/TransactionsFilterModel';
import Store from '../../Stores/TransactionsStore';
import Actions from '../../Actions/TransactionsActions';
import connectToStores from 'alt/utils/connectToStores';

class TransactionsReportComponent extends Component {
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
        this.selectedItems = [];
        this.onChange = this.onChange.bind(this);
    }

    onPageChange(data) {
        var filter = this.state.filter;
        filter.currentPage = data.selected + 1;
        Actions.fetchDataList(filter);
    }

    onSelectionChanged(data) {
        this.selectedItems = data;
    }

    sortDataList(e, orderBy) {
        var filter = this.state.filter;
        filter.orderBy = orderBy;
        if (filter.sortOrder === 'asc') {
            filter.sortOrder = 'desc';
            e.target.innerHTML = e.target.innerHTML.slice(0, -1) + '  &darr;';
        } else {
            filter.sortOrder = 'asc';
            e.target.innerHTML = e.target.innerHTML.slice(0, -1) + '  &uarr;'
        }
        Actions.fetchDataList(filter);
    }

    handleTimeoutSnackbar() {
        this.setState({ isSnackbarActive: false });
    }

    onExportToCsv() {
        Actions.exportToCsv(this.selectedItems);
    }

    onDateRangeChanged(range) {
        // ? range.endDate.format("M/D/Y") : '';
        this.setState({ fromDate: range.startDate, toDate: range.endDate });
    }

    filterDataList(e) {
        e.preventDefault();
        var model = this.state.filter;

        _.forIn(this.refs, function (value, key) {
            model[key] = value.inputRef.value
        });

        model.fromDate = this.state.fromDate;
        model.toDate = this.state.toDate;

        Actions.fetchDataList(model);
    }

    clearFilter() {
         _.forIn(this.refs, function (value, key) {
            value.inputRef.value = '';
        });

        this.setState({ filter: new FilterModel({}), fromDate: null, toDate:null });
        Actions.fetchDataList(new FilterModel({}));
    }

    render() {
        var t = true;
        return (
            <div className="mdl-card mdl-shadow--2dp full-size">
                <h5 style={{ marginLeft: '15px' }}>Transactions Report</h5>
                <div className="mdl-card__supporting-text">
                    <div>
                        <form onSubmit={this.filterDataList.bind(this)}>
                            <DateRangePicker onDatesChange={this.onDateRangeChanged.bind(this)}
                                startDate={this.state.fromDate}
                                endDate={this.state.toDate}
                                isOutsideRange={() => false}
                                numberOfMonths={2}
                                showDefaultInputIcon={true}
                                focusedInput={this.state.focusedInput}
                                onFocusChange={focusedInput => this.setState({ focusedInput })} />
                            <Textfield floatingLabel ref="learnerId" label="Learner Id" />
                            <Textfield floatingLabel ref="courseId" label="Course Id" />
                            <Textfield floatingLabel ref="instructorId" label="Instructor Id" />
                            <Button ripple className="filter-button">
                                <i className="material-icons">search</i>Search</Button>
                        </form>
                        <Button ripple onClick={this.clearFilter.bind(this)} className="filter-button">
                            <i className="material-icons">clear</i>Clear Search</Button>
                        <Button ripple onClick={this.onExportToCsv.bind(this)} className="filter-button">
                            <i className="material-icons">file_download</i>
                            Export</Button>
                    </div>
                </div>
                <div className="mdl-card__actions mdl-card--border">
                    <p style={{ marginRight: '10px', marginBottom: "0px", float: "right", opacity: "0.7" }}>Total Registrations:{this.state.filter.totalResults}  Total Revenue:${this.state.filter.totalRevenue}</p>
                </div>
                <div className="big-table">
                    <Table className="full-size"
                        selectable
                        onSelectionChanged={this.onSelectionChanged.bind(this)}
                        shadow={0}
                        rowKeyColumn="id"
                        rows={this.state.dataList}>
                        <TableHeader name="date" tooltip="Date" onClick={this.sortDataList.bind(this)}>
                            Date   &darr;
                        </TableHeader>
                        <TableHeader name="learner_id" tooltip="Learner (ID)" onClick={this.sortDataList.bind(this)}>
                            Learner (ID)   &darr;
                        </TableHeader>
                        <TableHeader name="course_id" tooltip="Course (ID)" onClick={this.sortDataList.bind(this)}>
                            Course (ID)   &darr;
                        </TableHeader>
                        <TableHeader name="instructor_id" tooltip="Instructor (ID)">
                            Instructor (ID)   &darr;
                        </TableHeader>
                        <TableHeader name="price" tooltip="Price" onClick={this.sortDataList.bind(this)}>
                            Price   &darr;
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
                <Snackbar active={this.state.isSnackbarActive} onTimeout={this.handleTimeoutSnackbar.bind(this)}> Export error!
                </Snackbar>
            </div>
        );
    }
}

export default connectToStores(TransactionsReportComponent);