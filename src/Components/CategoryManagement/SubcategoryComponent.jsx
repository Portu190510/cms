import React, { Component } from 'react';
import { Table, TableHeader, IconButton, Chip, ChipContact } from 'react-mdl';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';

import FileUpoadComponent from '../Common/FileUpoadComponent';
import AddSubCategoryDialogComponent from './AddSubCategoryDialogComponent';
import AddFeaturedCoursesDialogComponent from './AddFeaturedCoursesDialogComponent';
import FilterModel from '../../Models/SubcategoryFilterModel';
import Store from '../../Stores/SubcategoryStore';
import Actions from '../../Actions/SubcategoryActions';
import ParentActions from '../../Actions/ParentCategoryActions.js';
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
        filter.orderBy = orderBy;
        filter.sortOrder = filter.sortOrder === 'asc' ? 'desc' : 'asc';
        Actions.fetchDataList(filter);
    }

    onAddCategory(model) {
        Actions.addCategory(model);
    }

    loadCoverImage(id) {
        //TODO
    }

    deleteFeature(courseId) {
        Actions.setToUnFeatured(courseId);
    }

    render() {
        var self = this;
        return (
            <div className="mdl-card mdl-shadow--2dp full-size">
                <div className="mdl-card__actions mdl-card--border">
                    <AddSubCategoryDialogComponent onAddCategory={this.onAddCategory.bind(this)}>
                    </AddSubCategoryDialogComponent>
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
                        <TableHeader name="parentCategory" tooltip="Parent Categories" onClick={this.sortDataList.bind(this)}>
                            Parent Categories
                        </TableHeader>
                        <TableHeader name="descriptions" tooltip="Descriptions">
                            Descriptions
                        </TableHeader>
                        <TableHeader name="coverlink" cellFormatter={(coverlink, id) =>
                            <div>
                                {coverlink ?
                                    <Chip onClick={e => { window.open(coverlink); }}>
                                        <ChipContact
                                            style={{ background: 'url(' + coverlink + ') 0 0 / cover' }}
                                        />
                                        Click to open
                                    </Chip>
                                    : ""}
                                <FileUpoadComponent ripple className="filter-button" onLoadStart={this.loadCoverImage.bind(this, id)} label="Upload a picture" />
                            </div>
                        } tooltip="Action">
                            Cover Image
                         </TableHeader>
                        <TableHeader name="featuredCourses" cellFormatter={(featuredCourses, row) =>
                            <div>
                                {
                                    featuredCourses.map(function (item) {
                                        return <Chip style={{ display: "block !important" }} key={item.id} title={item.name} onClose={self.deleteFeature.bind(self, item.id, row.id)}>{item.name}</Chip>
                                    })
                                }
                                <AddFeaturedCoursesDialogComponent subcategoryId={row.id} reloadGrid={Actions.fetchDataList.bind(this, new FilterModel({}))}></AddFeaturedCoursesDialogComponent>
                            </div>
                        } tooltip="Action">
                            Featured Courses
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

export default connectToStores(SubcategoryComponent);