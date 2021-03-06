import React, { Component } from 'react';
import { Table, TableHeader, IconButton, Textfield, Button, Checkbox } from 'react-mdl';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';

import '../../Styles/DomainTable.css';

import FilterModel from '../../Models/DomainFilterModel';
import Store from '../../Stores/DomainStore';
import Actions from '../../Actions/DomainActions';
import connectToStores from 'alt/utils/connectToStores';

class DomainManagementComponent extends Component {
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
        this.filterDataList = this.filterDataList.bind(this);
    }

    onAddDomainSubmit(e) {
        e.preventDefault();
        var domainModel = {
            id:0,
            created:null,
            updated: null
        };
        var self = this;
        _.forIn(this.refs, function (value, key) {
            domainModel[key] = value.inputRef ? value.inputRef.value : self.refs[key].state;
            if(value.inputRef)
            {
                value.inputRef.value = '';
            }
        });
   
        domainModel.isEnabled = domainModel.isEnabled == null? true:domainModel.isEnabled;
        Actions.createDomain(domainModel);
    }

    onPageChange(data) {
        var filter = this.state.filter;
        filter.currentPage = data.selected + 1;
        Actions.fetchDataList(filter);
    }

    onSelectionChanged(data) {
        this.selectedItems = data;
    }

    onDeleteDomain(domainId) {
        if (Number.isInteger(domainId)) {
            Actions.deleteDomain(domainId);
        } else {
            this.selectedDomains.forEach(function (domainId) {
                Actions.deleteDomain(domainId);
            });
        }
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

    handleIsEnableClick(e) {
        this.refs['isEnabled'].state = e.target.checked;
    }

    render() {
        return (
            <div className="mdl-card mdl-shadow--2dp full-size">
            <h5 style={{ marginLeft: '15px' }}>Domain Management</h5>
                <div className="mdl-card__supporting-text">
                    <form onSubmit={this.onAddDomainSubmit.bind(this)}>
                        <Textfield floatingLabel ref="domain" required label="Domain name (pattern : *.csod.com)" pattern=".*\.csod\.com$" />
                        <Textfield floatingLabel ref="purpose" required label="Purpose" />
                        <div className="mdl-textfield mdl-textfield--floating-label">
                            <Checkbox label="Is Enable" ref="isEnabled" onChange={this.handleIsEnableClick.bind(this)} ripple defaultChecked />
                        </div>
                        <Button className="filter-button" ripple>
                            <i className="material-icons">create</i>Add
                            </Button>
                    </form>
                    <Button ripple className="filter-button" onClick={this.onDeleteDomain.bind(this)}>
                        <i className="material-icons">delete</i>Delete Selected
                            </Button>
                </div>
                <div className="mdl-card__actions mdl-card--border"></div>
                <div className="big-table">
                    <Table className="full-size"
                        selectable
                        onSelectionChanged={this.onSelectionChanged.bind(this)}
                        shadow={0}
                        rowKeyColumn="id"
                        rows={this.state.dataList}>
                        <TableHeader name="domain" tooltip="Domain name" onClick={this.sortDataList.bind(this)}>
                            Domain
                        </TableHeader>
                   
                        <TableHeader name="purpose" tooltip="Purpose" onClick={this.sortDataList.bind(this)}>
                            Purpose
                        </TableHeader>
                        <TableHeader name="isEnabled" tooltip="Is Enabled" onClick={this.sortDataList.bind(this)} className="is-enable-column">
                            Is Enabled
                        </TableHeader>
                        <TableHeader name="id" cellFormatter={(id) =>
                            <Button ripple onClick={this.onDeleteDomain.bind(this, id)} className="filter-button">
                                <i className="material-icons">delete</i>Delete</Button>} tooltip="Action">
                            Action
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

export default connectToStores(DomainManagementComponent);