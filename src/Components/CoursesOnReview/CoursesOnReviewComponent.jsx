import React, { Component } from 'react';
import { IconButton, Textfield, Button, Card, CardTitle, CardText, CardActions, CardMenu, Snackbar } from 'react-mdl';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';

import FilterModel from '../../Models/CoursesOnReviewFilterModel';
import Store from '../../Stores/CoursesOnReviewStore';
import Actions from '../../Actions/CoursesOnReviewActions';
import connectToStores from 'alt/utils/connectToStores';

class CoursesOnReviewComponent extends Component {
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

    filterDataList(e) {
        e.preventDefault();
        var model = this.state.filter;

        _.forIn(this.refs, function (value, key) {
            model[key] = value.inputRef.value
        });

        Actions.fetchDataList(model);
    }

    onCourseStatus(courseId, status) {
        Actions.changeCourseStatus(courseId, status);
    }

    handleTimeoutSnackbar() {
        this.setState({ isSnackbarActive: false });
    }

    render() {
        return (
            <div className="mdl-card mdl-shadow--2dp full-size">
                <h5 style={{marginLeft:'15px'}}>Courses in  "Submitted for Review"</h5>
                <div className="mdl-card__supporting-text">
                    <div>
                        <form onSubmit={this.filterDataList.bind(this)}>
                            <Textfield floatingLabel ref="title" label="Title" />
                            <Textfield floatingLabel ref="instructorIdOrName" label="Instructor Id/Name" />
                            <Button ripple className="filter-button">
                                <i className="material-icons">search</i>Search</Button>
                        </form>
                    </div>
                </div>
                <div className="mdl-card__actions mdl-card--border" style={{borderBottom: "1px solid rgba(128, 128, 128, 0.26)"}}>
                    <p style={{marginLeft:'15px', marginBottom: "0px"}}>{this.state.filter.totalResults} results</p>
                </div>
                <div className="big-table">

                    {
                        this.state.dataList.map((item) => {
                            return (<Card shadow={0} className="card-custom">
                                <CardTitle className="card-title-custom">{item.title}</CardTitle>
                                <CardText className="card-text-custom">
                                    <div className="card-body">
                                        <div className="card-left-column">
                                            <p><a href={"https://www.cyberu.com/course/"+ item.slug} target="_blank">{item.courseId}</a></p>
                                            <p>Category: {item.primaryCategoryName}</p>
                                            <p>Subcategory: {item.primarySubCategoryName}</p>
                                            <p>Additional Category: {item.secondaryCategoryName}</p>
                                            <p>Additional Subcategory: {item.secondarySubCategoryName}</p>
                                        </div>
                                        <div className="card-right-column">
                                            <p>
                                                {
                                                    item.instructorIds.map((instructor) => {
                                                        return (<p style={{textAlign:"right"}}><a href={"mailto:"+instructor.email} target="_blank">{instructor.name}</a></p>)
                                                    })
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </CardText>
                                <CardActions border>
                                    <Button colored onClick={this.onCourseStatus.bind(this, item.courseId, this.state.courseStates[0])}>Deny</Button>
                                    <Button colored onClick={this.onCourseStatus.bind(this, item.courseId, this.state.courseStates[1])}>Approve</Button>
                                </CardActions>
                                <CardMenu>
                                    Date Submitted: {item.dateSubmitted}
                                </CardMenu>
                            </Card>
                            )
                        })
                    }
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
                <Snackbar active={this.state.isSnackbarActive} onTimeout={this.handleTimeoutSnackbar.bind(this)}> Some error!
                </Snackbar>
            </div>
        );
    }
}

export default connectToStores(CoursesOnReviewComponent);