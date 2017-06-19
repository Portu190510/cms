import alt from '../Alt';
import _ from 'lodash';
import Actions from '../Actions/CoursesPerCategoryActions';
import FilterModel from '../Models/CoursesPerCategoryFilterModel';

class CoursesPerCategoryStore {
    constructor() {
        this.bindActions(Actions);

        // State
        this.isSnackbarActive = false;
        this.statuses = [
            { id: 10, name: 'Published' },
            { id: 3, name: 'Draft' },
            { id: 4, name: 'Active' },
            { id: 6, name: 'Deleted' },
            { id: 7, name: 'Pending' },
            { id: 8, name: 'Archived' },
            { id: 9, name: 'In_review' },
            { id: 11, name: 'Pending_Approval' },
            { id: 12, name: 'Ready_To_Publish' }];
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
                categoryId: item.id,
                categoryName: attributes.label,
                status: attributes.status,
                coursesCount: attributes.courses_count,
                subCategories: attributes.children.map((subCat) => {
                    return {
                        subcategoryId: subCat.id,
                        subcategoryName: subCat.attributes.label,
                        status: subCat.attributes.status,
                        coursesCount: subCat.attributes.courses_count,
                        progress: subCat.attributes.progress
                    }
                })
            }
        });

        var filterModel = this.filter;
        filterModel.totalPages = response.meta.total_pages;

        this.setState({ filter: filterModel });
        this.setState({ dataList: data });
    }
}

export default alt.createStore(CoursesPerCategoryStore, 'CoursesPerCategoryStore');