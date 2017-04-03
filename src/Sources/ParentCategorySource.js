import Config from '../config';
import axios from 'axios';

var ParentCategorySource = {
    fetch: function (model) {
        return axios.get(`${Config.apiUrl}${Config.endpointUrl.parentCategory.fetch}?start=${model.start}&limit=${model.limit}&orderBy=${model.orderBy}&sortOrder=${model.sortOrder}`)
        .then(response => {
            return response.data;
        }).catch(response => {
            console.log(response);
        });
    }
};

export default ParentCategorySource;