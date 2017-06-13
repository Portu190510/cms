import Config from '../config';
import ObjectToQuery from '../Utils/ObjectToQueryStringUtil';
import axios from 'axios';

var lmsConfig = Config.apiUrl.lms;

var ParentCategorySource = {
    fetch: function (model) {
        return axios.get(`${lmsConfig.baseUrl}${lmsConfig.endpointUrl.parentCategory.fetch}?${ObjectToQuery.asQuery(model)}`)
            .then(response => {
                return response.data;
            }).catch(response => {
                console.log(response);
                return [
                    {
                        id: 'item.id',
                        title: 'attributes.title',
                        status: 'attributes.status',
                        descriptions: 'attributes.descriptions',
                        coverlink: 'attributes.coverlink'
                    }
                ]
            });
    },

    fetchCategoryList: function () {
        var model = {
            page: {
                size: 1000,
            },
            filter: {
                level: {
                    eq: 1,
                }
            }
        };
        return axios.get(`${lmsConfig.baseUrl}${lmsConfig.endpointUrl.parentCategory.fetch}?${ObjectToQuery.asQuery(model)}`)
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
    }
};

export default ParentCategorySource;