import alt from '../Alt';
import _ from 'lodash';
import Actions from '../Actions/CoursesPerCategoryActions';
import FilterModel from '../Models/CoursesPerCategoryFilterModel';

class CoursesPerCategoryStore {
    constructor() {
        this.bindActions(Actions);

        // State
        this.isSnackbarActive = false;
        this.statuses = [{id:1,name:'Active'},{id:2,name:'Deleted'}];
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
                categoryId: attributes.categoryId,
                categoryName: attributes.categoryName,
                subCategories: attributes.subCategories,
                categorySummary: attributes.categorySummary
            }
        });

        var filterModel = this.filter;
        filterModel.totalPages = response.totalPage;

        this.setState({ filter: filterModel });
        this.setState({ dataList: data });
    }
}

export default alt.createStore(CoursesPerCategoryStore, 'CoursesPerCategoryStore');