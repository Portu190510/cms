import Config from '../config';
import axios from 'axios';

var CourseSource = {
    fetch: function (model) {
        return axios.get(`${Config.endpointUrl.course.apiUrl}${Config.endpointUrl.course.fetch}?${model.getParamsString()}`)
        .then(response => {
            return response.data;
        }).catch(response => {
            console.log(response);
        });
    }
};

export default CourseSource;