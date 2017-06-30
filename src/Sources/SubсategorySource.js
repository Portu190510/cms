import Config from '../config';
import ObjectToQuery from '../Utils/ObjectToQueryStringUtil';
import axios from 'axios';

var lmsConfig = Config.apiUrl.lms;

var SubcategorySource = {
    fetch: function (model) {
        return axios.get(`${lmsConfig.baseUrl}${lmsConfig.endpointUrl.parentCategory.fetchSubcategory}?${ObjectToQuery.asQuery(model)}`)
            .then(response => {
                return response.data;
            }).catch(response => {
                console.log(response);
            });
    },
    addCategory: function (model) {
        return axios.post(`${lmsConfig.baseUrl}${lmsConfig.endpointUrl.parentCategory.create}`, model)
            .then(response => {
                return response.data;
            }).catch(response => {
                console.log(response);
            });
    },
    updateCategory: function (model, id) {
        return axios.patch(`${lmsConfig.baseUrl}${lmsConfig.endpointUrl.parentCategory.update}${id}`, model)
            .then(response => {
                return response.data;
            }).catch(response => {
                console.log(response);
            });
    }
};

export default SubcategorySource;