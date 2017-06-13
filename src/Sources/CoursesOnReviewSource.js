import Config from '../config';
import ObjectToQuery from '../Utils/ObjectToQueryStringUtil';
import axios from 'axios';

var gatewayConfig = Config.apiUrl.gateway;
var lmsConfig = Config.apiUrl.lms;

var CoursesOnReviewSource = {
    fetch: function (model) {
        return axios.get(`${gatewayConfig.baseUrl}${gatewayConfig.endpointUrl.courseOnReview.fetch}?${ObjectToQuery.asQuery(model)}`)
            .then(response => {
                return response.data;
            }).catch(response => {
                console.log(response);
            });
    },
    changeStatus: function (courseId, status) {
        return axios.patch(`${lmsConfig.baseUrl}/courses/${courseId}/workflow`, {
            data: { attributes: { to_status: status } }
        }).then(response => {
            return response;
        }).catch(response => {
            console.log(response);
        });
    }
};

export default CoursesOnReviewSource;