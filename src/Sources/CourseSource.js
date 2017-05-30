import Config from '../config';
import ObjectToQuery from '../Utils/ObjectToQueryStringUtil';
import axios from 'axios';

var CourseSource = {
    fetch: function (model) {
        return axios.get(`${Config.endpointUrl.course.apiUrl}${Config.endpointUrl.course.fetch}?${ObjectToQuery.asQuery(model)}`)
        .then(response => {
            return response.data;
        }).catch(response => {
            console.log(response);
        });
    }
};

export default CourseSource;