import React, {Component} from 'react';
import { Table, TableHeader, IconButton, Button } from 'react-mdl';
import FilterModel from '../../Models/SubcategoryFilterModel';
import _ from 'lodash';

import Store from '../../Stores/SubcategoryStore';
import Actions from '../../Actions/SubcategoryActions';
import ReactPaginate from 'react-paginate';
import connectToStores from 'alt/utils/connectToStores';

class SubcategoryComponent extends Component {
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

    onPageChange(data) {
        var filter = this.state.filter;
        filter.currentPage = data.selected + 1;
        Actions.fetchDataList(filter);
    }

    filterDataList(model) {
        Actions.fetchDataList(model);
    }

    sortDataList(e, orderBy) {
        var filter = this.state.filter;
        filter.orderBy = orderBy;
        filter.sortOrder = filter.sortOrder === 'asc' ? 'desc' : 'asc';
        Actions.fetchDataList(filter);
    }

    constructor(props) {
        super(props);
        this.state = Store.getState();
        this.onChange = this.onChange.bind(this);
        this.filterDataList = this.filterDataList.bind(this);
    }

    render() {
        return (
            <div className="mdl-card mdl-shadow--2dp full-size">
                <div className="mdl-card__actions mdl-card--border">
                        <Button className="filter-button" ripple>
                            <i className="material-icons">add</i> Add subcategory
                            </Button>
                </div>
                <div className="big-table">
                    <Table className="full-size"
                        shadow={0}
                        rowKeyColumn="id"
                        rows={this.state.dataList}>
                        <TableHeader name="title" tooltip="Title" onClick={this.sortDataList.bind(this)}>
                            Title
                        </TableHeader>
                        <TableHeader name="status" tooltip="Status" onClick={this.sortDataList.bind(this)}>
                            Status
                        </TableHeader>
                        <TableHeader name="parentCategory" tooltip="Parent Category" onClick={this.sortDataList.bind(this)}>
                            Status
                        </TableHeader>
                        <TableHeader name="descriptions" tooltip="Descriptions" onClick={this.sortDataList.bind(this)} className="is-enable-column">
                            Descriptions
                        </TableHeader>
                        <TableHeader name="coverlink" cellFormatter={(coverlink) =>
                            <Button ripple className="filter-button">
                                <i className="material-icons">delete</i>Delete</Button>} tooltip="Action">
                            Cover Image
                         </TableHeader>
                         <TableHeader name="coverlink" cellFormatter={(coverlink) =>
                            <Button ripple className="filter-button">
                                <i className="material-icons">delete</i>Delete</Button>} tooltip="Action">
                            Featured Courses
                         </TableHeader>
                    </Table>
                    <div className="pagination-box">
                        <ReactPaginate containerClassName="pagination" pageCount={this.state.filter.totalPages}
                            previousLabel={<IconButton name="keyboard_arrow_left" />}
                            nextLabel={<IconButton name="keyboard_arrow_right" />}
                            breakLabel={<span className="ellipsis">...</span>}
                            pageNum={this.state.filter.currentPage}
                            initialPage={1}
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

export default connectToStores(SubcategoryComponent);