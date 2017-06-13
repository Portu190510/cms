import alt from '../Alt';
import _ from 'lodash';
import Actions from '../Actions/CoursesOnReviewActions';
import FilterModel from '../Models/CoursesOnReviewFilterModel';

class CoursesOnReviewStore {
    constructor() {
        this.bindActions(Actions);

        // State
        this.isSnackbarActive = false;
        this.courseStates = ["draft", "ready_to_publish"];
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
            var instructors = attributes.instructors.map(function (instructor) {
                return {
                    name: instructor.first_name + ' ' + instructor.last_name,
                    email: instructor.email
                }
            });
            return {
                courseId: item.id,
                title: attributes.title,
                dateSubmitted: (new Date(attributes.updated)).toLocaleDateString('en-US'),
                primaryCategoryName: attributes.primary_category ? attributes.primary_category.label : '',
                primarySubCategoryName: attributes.primary_subcategory ? attributes.primary_subcategory.label : '',
                secondarySubCategoryName: attributes.secondary_subcategory ? attributes.secondary_subcategory.label : '',
                secondaryCategoryName: attributes.secondary_category ? attributes.secondary_category.label : '',
                instructorIds: instructors
            }
        });

        var filterModel = this.filter;
        filterModel.totalPages = response.meta.total_pages || 1;
        filterModel.totalResults = response.meta.total;

        this.setState({ filter: filterModel });
        this.setState({ dataList: data });
    }
}

export default alt.createStore(CoursesOnReviewStore, 'CoursesOnReviewStore');