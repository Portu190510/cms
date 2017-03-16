import React, { Component } from 'react';
import { Table, TableHeader, IconButton, Textfield, Button } from 'react-mdl';
import DomainFilterModel from '../../Models/DomainFilterModel';
import _ from 'lodash';

import DomainStore from '../../Stores/DomainStore';
import DomainActions from '../../Actions/DomainActions';
import connectToStores from 'alt/utils/connectToStores';
import ReactPaginate from 'react-paginate';

class DomainManagementComponent extends Component {
    static getStores() {
        return [DomainStore];
    }

    static getPropsFromStores() {
        return DomainStore.getState();
    }

    componentDidMount() {
        DomainStore.listen(this.onChange);
        DomainActions.fetchDataList(new DomainFilterModel({}));
        window.componentHandler.upgradeDom();
    }

    componentWillUnmount() {
        window.componentHandler.upgradeDom();
        DomainStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    constructor(props) {
        super(props);
        this.state = DomainStore.getState();
        this.selectedDomains = [];
        this.onChange = this.onChange.bind(this);
        this.filterDataList = this.filterDataList.bind(this);
    }

    onAddDomainSubmit(e) {
        e.preventDefault();
        var domainModel = {};

        _.forIn(this.refs, function (value, key) {
            domainModel[key] = value.inputRef.value
        });

        DomainActions.createDomain(domainModel);
    }

    onPageChange(data) {
        var filter = this.state.filter;
        filter.currentPage = data.selected + 1;
        DomainActions.fetchDataList(filter);
    }

    onSelectionChanged(data) {
        this.selectedDomains = data;
    }

    onDeleteDomain() {
        this.selectedDomains.forEach(function (domainId) {
            DomainActions.deleteDomain(domainId);
        });

    }

    filterDataList(model) {
        DomainActions.fetchDataList(model);
    }
    render() {
        return (
            <div className="mdl-card mdl-shadow--2dp full-size">
                <div className="mdl-card__supporting-text">
                    <form onSubmit={this.onAddDomainSubmit.bind(this)}>
                        <Textfield floatingLabel ref="domain" required label="Domain name" />
                        <Textfield floatingLabel ref="purpose" required label="Purpose" />
                        <Button ripple>
                            <i className="material-icons">create</i>Add
                            </Button>
                    </form>
                    <Button ripple onClick={this.onDeleteDomain.bind(this)}>
                        <i className="material-icons">delete</i>Delete Selected
                            </Button>
                </div>
                <div className="mdl-card__actions mdl-card--border"></div>
                <div className="big-table">
                    <Table className="full-size"
                        sortable
                        selectable
                        onSelectionChanged={this.onSelectionChanged.bind(this)}
                        shadow={0}
                        rowKeyColumn="id"
                        rows={this.state.dataList}>
                        <TableHeader name="domain" tooltip="Domain name">
                            Domain
          </TableHeader>
                        <TableHeader name="stgOrPrd" tooltip="STG or PRD">
                            STG or PRD
          </TableHeader>
                        <TableHeader name="purpose" tooltip="Purpose">
                            Purpose
          </TableHeader>
                        <TableHeader name="isEnabled" tooltip="Is Enabled">
                            IsEnabled
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

export default connectToStores(DomainManagementComponent);