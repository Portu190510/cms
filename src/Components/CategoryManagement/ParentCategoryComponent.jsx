import React, { Component } from 'react';
import { Table, TableHeader, IconButton, Chip, ChipContact } from 'react-mdl';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';

import FilterModel from '../../Models/ParentCategoryFilterModel';
import Store from '../../Stores/ParentCategoryStore';
import Actions from '../../Actions/ParentCategoryActions';
import AddCategoryDialogComponent from './AddCategoryDialogComponent';
import FileUpoadComponent from '../Common/FileUpoadComponent';
import connectToStores from 'alt/utils/connectToStores';

class ParentCategoryComponent extends Component {
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
        this.filterDataList = this.filterDataList.bind(this);
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
        filter.sortOrder = filter.sortOrder === 'asc' ? 'desc' : 'asc';
        filter.orderBy = filter.sortOrder === 'asc' ? orderBy : '-' + orderBy;
        Actions.fetchDataList(filter);
    }

    onAddCategory(model) {
        Actions.addCategory(model);
    }

    loadCoverImage(id, image) {
        console.log(id + ' ' + image);
    }

    render() {
        return (
            <div className="mdl-card mdl-shadow--2dp full-size">
                <div className="mdl-card__actions mdl-card--border">
                    <AddCategoryDialogComponent onAddCategory={this.onAddCategory.bind(this)}>
                    </AddCategoryDialogComponent>
                </div>
                <div className="big-table">
                    <Table className="full-size"
                        shadow={0}
                        rowKeyColumn="id"
                        rows={this.state.dataList}>
                        <TableHeader name="title" tooltip="Title" onClick={this.sortDataList.bind(this)}>
                            Title
                        </TableHeader>
                        <TableHeader name="status" tooltip="Status" onClick={this.sortDataList.bind(this)} >
                            Status
                        </TableHeader>
                        <TableHeader name="descriptions" tooltip="Descriptions">
                            Description
                        </TableHeader>
                        <TableHeader name="coverlink" style={{ width: "100px !important" }} cellFormatter={(coverlink, id) =>
                            <div>
                                {coverlink ?
                                    <Chip onClick={e => { window.open(coverlink); }}>
                                        <ChipContact
                                            style={{ background: 'url(' + coverlink + ') 0 0 / cover' }}
                                        />
                                        Click to open
                                    </Chip>
                                    : ""}
                                <FileUpoadComponent ripple className="filter-button"
                                    onLoadStart={id}
                                    onLoadEnd={(err) => {
                                        if (err) {
                                            console.error(err);
                                        }
                                    }}
                                    label="Upload a picture"
                                />
                            </div>
                        } tooltip="Cover Image">
                            Cover Image
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
            </div>
        );
    }
}

export default connectToStores(ParentCategoryComponent);