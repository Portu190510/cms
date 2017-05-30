import Config from '../config';
import ObjectToQuery from '../Utils/ObjectToQueryStringUtil';
import axios from 'axios';

var ParentCategorySource = {
    fetch: function (model) {
        return axios.get(`${Config.endpointUrl.parentCategory.apiUrl}${Config.endpointUrl.parentCategory.fetch}?${ObjectToQuery.asQuery(model)}`)
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
        return axios.get(`${Config.apiUrl}${Config.endpointUrl.parentCategory.fetchCategoryList}`)
            .then(response => {
                return response.data;
            }).catch(response => {
                console.log(response);
            });
    }
};

export default ParentCategorySource;