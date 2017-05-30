import React, { Component } from 'react';
import { IconButton, Textfield, Button, Card, CardTitle, CardText, ProgressBar, CardMenu, Snackbar } from 'react-mdl';
import { SelectField, Option } from 'react-mdl-selectfield';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';

import FilterModel from '../../Models/CoursesPerCategoryFilterModel';
import Store from '../../Stores/CoursesPerCategoryStore';
import Actions from '../../Actions/CoursesPerCategoryActions';
import connectToStores from 'alt/utils/connectToStores';

class CoursesPerCategoryComponent extends Component {
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

    filterDataList(status) {
        var model = this.state.filter;
        model.status = status;
        this.setState({ filter: model });

        Actions.fetchDataList(model);
    }

    handleTimeoutSnackbar() {
        this.setState({ isSnackbarActive: false });
    }

    render() {
        return (
            <div className="mdl-card mdl-shadow--2dp full-size">
                <h5 style={{ marginLeft: '15px' }}>Courses Per Category Report</h5>
                <div className="mdl-card__supporting-text">
                    <div className="mdl-selectfield mdl-js-selectfield">
                        <SelectField label={'Status'} value={this.state.filter.status} onChange={this.filterDataList.bind(this)}>
                            {
                                this.state.statuses.map((st) => {
                                    return <Option value={st.name}>{st.name}</Option>
                                })
                            }
                        </SelectField>
                    </div>
                </div>
                <div className="mdl-card__actions mdl-card--border">
                </div>
                <div className="big-table">
                    <div>
                        {
                            this.state.dataList.map((item) => {
                                return (<Card shadow={0} className="card-custom-half">
                                    <CardTitle className="card-title-custom">{item.categoryName}</CardTitle>
                                    <CardText className="card-text-custom">
                                        <div className="card-body">
                                            <div>
                                                {
                                                    item.subCategories.map((subcat) => {
                                                        return (<p>
                                                            <table>
                                                                <tbody>
                                                                    <tr>
                                                                        <td style={{ minWidth: "200px" }}>{subcat.name}</td>
                                                                        <td style={{ minWidth: "567px" }}><ProgressBar style={{ width: "560px" }} progress={subcat.progress} /></td>
                                                                        <td style={{ minWidth: "50px" }}>{subcat.coursesCount}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </p>)

                                                    })
                                                }
                                            </div>
                                        </div>
                                    </CardText>
                                    <CardMenu>
                                        Summary: {item.categorySummary}
                                    </CardMenu>
                                </Card>
                                )
                            })
                        }
                    </div>
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
                <Snackbar active={this.state.isSnackbarActive} onTimeout={this.handleTimeoutSnackbar.bind(this)}> Some error!
                </Snackbar>
            </div>
        );
    }
}

export default connectToStores(CoursesPerCategoryComponent);