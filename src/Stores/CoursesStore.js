import alt from '../Alt';
import _ from 'lodash';
import CoursesActions from '../Actions/CoursesActions';
import CourseFilterModel from '../Models/CourseFilterModel';

class CoursesStore {
    constructor() {
        this.bindActions(CoursesActions);

        // State
        this.isSnackbarActive = false;
        this.dataList = [];
        this.filter = new CourseFilterModel({});
    }

    onExportSuccess(isSuccess) {
        if (!isSuccess) {
            this.isSnackbarActive = true;
        }
    }

    onFetchDataList(filterModel) {
        this.setState({ filter: filterModel });
        this.setState({ dataList: [] });
    }

    onUpdateDataList(response) {
        if (response && response.data) {
            var data = response.data.map(function(item) {
                var attributes = item.attributes;
                var lastUpdatedDates = (new Date(attributes.updated)).toLocaleDateString('en-US');
                var instructors = attributes.instructors.map(function(source) {
                    return source.first_name + ' ' + source.last_name;
                });
                var instructorIDs = attributes.instructors.map(function(source) {
                    return source.id;
                });
                var skills = attributes.skills.map(function(source) {
                    return source.label;
                });

                return {
                    id: item.id,
                    title: attributes.title,
                    instructor: _.join(instructors, '\n  '),
                    userIdOfInstructor: _.join(instructorIDs, '\n  '),
                    duration_sec: (attributes.duration_sec / 60).toFixed(1) + ' min.',
                    headline: attributes.headline,
                    primary_category: attributes.primary_category ? attributes.primary_category.label : '',
                    primary_subcategory: attributes.primary_subcategory ? attributes.primary_subcategory.label : '',
                    secondary_category: attributes.secondary_category ? attributes.secondary_category.label : '',
                    secondary_subcategory: attributes.secondary_subcategory ? attributes.secondary_subcategory.label : '',
                    status: attributes.status,
                    updated: lastUpdatedDates,
                    skills: _.join(skills, '\n  ')
                }
            });

            var filterModel = this.filter;
            filterModel.totalPages = response.meta.total_pages || 1;
            filterModel.totalResults = response.meta.total;

            this.setState({ filter: filterModel });

            this.setState({ dataList: data });
        }
        console.log("NO RESPONSE");
    }
}

export default alt.createStore(CoursesStore, 'CoursesStore');