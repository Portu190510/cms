import alt from '../Alt';
import _ from 'lodash';
import Actions from '../Actions/CoursesOnReviewActions';
import FilterModel from '../Models/CoursesOnReviewFilterModel';

class CoursesOnReviewStore {
    constructor() {
        this.bindActions(Actions);

        // State
        this.isSnackbarActive = false;
        this.courseStates = ["DENY", "APPROVE"];
        this.dataList = [];
        this.filter = new FilterModel({});
    }

    onFetchDataList(filterModel) {
        this.setState({ filter: filterModel });
        this.setState({ dataList: [] });
    }

    onIsChangeCourseStatusSuccess(isSuccess) {
        if (!isSuccess) {
            this.isSnackbarActive = true;
        }
    }

    onUpdateDataList(response) {
        var data = response.data.map(function (item) {
            var attributes = item.attributes;
            return {
                courseId: attributes.courseId,
                title: attributes.title,
                dateSubmitted: attributes.dateSubmitted,
                primaryCategoryName: attributes.primaryCategoryName,
                primarySubCategoryName: attributes.primarySubCategoryName,
                secondarySubCategoryName: attributes.secondarySubCategoryName,
                secondaryCategoryName: attributes.secondaryCategoryName,
                instructorIds: attributes.instructorIds
            }
        });

        var filterModel = this.filter;
        filterModel.totalPages = response.totalPage;
        filterModel.totalResults = response.totalResults;

        this.setState({ filter: filterModel });
        this.setState({ dataList: data });
    }
}

export default alt.createStore(CoursesOnReviewStore, 'CoursesOnReviewStore');