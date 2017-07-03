import Config from '../config';
import ObjectToQuery from '../Utils/ObjectToQueryStringUtil';
import axios from 'axios';

var gatewayConfig = Config.apiUrl.gateway;

var CourseRegistrationsSource = {
    fetch: function (model) {
        return axios.get(`${gatewayConfig.baseUrl}${gatewayConfig.endpointUrl.courseRegistration.fetch}?${ObjectToQuery.asQuery(model)}`)
            .then(response => {
                return response.data;
            }).catch(response => {
                console.log(response);
                return null;
            });
    },

    getCourseRegistrationDetails: function (courseId) {
        return axios.get(`${gatewayConfig.baseUrl}${gatewayConfig.endpointUrl.courseRegistration.courseDetail}?filter[reference_id]=${courseId}&page[size]=1000&page[number]=1`)
            .then(response => {
                return response.data;
            }).catch(response => {
                console.log(response);
                return null;
            });
    }
};

export default CourseRegistrationsSource;