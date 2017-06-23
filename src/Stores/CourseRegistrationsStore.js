import alt from '../Alt';
import _ from 'lodash';
import Actions from '../Actions/CourseRegistrationsActions';
import FilterModel from '../Models/CourseRegistrationsFilterModel';

class CourseRegistrationsStore {
    constructor() {
        this.bindActions(Actions);

        // State
        this.dataList = [];
        this.openDialog = false;
        this.registrationDetails = { courseName: "", totalResults: 0, sortOrder: "asc" };
        this.registrationsDataList = [];
        this.filter = new FilterModel({});
    }

    onFetchDataList(filterModel) {
        this.setState({ filter: filterModel });
        this.setState({ dataList: [] });
    }

    onGetCourseRegistrationDetails(filterModel) {
        this.setState({ registrationDetails: { courseName: "", totalResults: 0 } });
        this.setState({ registrationsDataList: [] });
    }

    onCourseRegistrationDetails(response) {
        var data = response.data.map(function (item) {
            var attributes = item.attributes;
            return {
                id: item.id,
                firstName: attributes.first_name,
                lastName: attributes.last_name,
                userId: attributes.user_id,
                registrationDate: attributes.created_at,
                lastActivityDate: attributes.lastActivityDate
            }
        });
        var details = this.registrationDetails;
        details.courseName = response.courseName;
        details.totalResults = response.totalResults;

        this.setState({ registrationDetails: details });
        this.setState({ registrationsDataList: data });
        this.setState({ openDialog: true });
    }

    onUpdateDataList(response) {
        var data = response.data.map(function (item) {
            var attributes = item.attributes;
            return {
                courseId: item.id,
                courseTitle: attributes.title,
                numberOfRegistrations: attributes.registrations_count
            }
        });

        var filterModel = this.filter;
        filterModel.totalPages = response.totalPage;
        filterModel.totalResults = response.totalResults;

        this.setState({ openDialog: false });
        this.setState({ filter: filterModel });
        this.setState({ dataList: data });
    }
}

export default alt.createStore(CourseRegistrationsStore, 'CourseRegistrationsStore');