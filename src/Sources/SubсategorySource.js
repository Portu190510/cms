import Config from '../config';
import ObjectToQuery from '../Utils/ObjectToQueryStringUtil';
import axios from 'axios';

var SubcategorySource = {
    fetch: function (model) {
        /* return axios.get(`${Config.apiUrl}${Config.endpointUrl.parentCategory.fetch}?${ObjectToQuery.asQuery(model)}`)
             .then(response => {
                 return response.data;
             }).catch(response => {
                console.log(response);
           });*/

        var mock = [{
            id: 1,
            attributes: {
                title: 'a',
                status: 'attributes.status',
                parentCategory: 'attributes.parentCategory',
                descriptions: 'attributes.descriptions',
                coverlink: 'attributes.coverlink',
                featuredCourses: [{id:1, name:"a"},{id:2, name:"c"},{id:3, name:"c"}]
            }
        }];

        return new Promise(function (resolve, reject) {
            resolve(
                {
                    data: mock,
                    links :{}
                }
            );
        });
    }
};

export default SubcategorySource;