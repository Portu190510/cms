import Config from '../config';
import axios from 'axios';

var lmsConfig = Config.apiUrl.lms;

var FeatureSource = {
    fetch: function (subcategoryId, searchFieldValue) {
        return axios.get(`${lmsConfig.baseUrl}${lmsConfig.endpointUrl.feature.fetch}/${subcategoryId}/non_featured_courses?filter[title][search]=${searchFieldValue}&page[size]=1000`)
            .then(response => {
                return response.data;
            }).catch(response => {
                console.log(response);
                return [{ id: 1, name: 'a' }, { id: 2, name: 'b' }, { id: 3, name: 'c' }, { id: 4, name: 'd' }]
            });
    },
    addFeatures: function (featuresIdArray) {
        featuresIdArray.forEach((courseId) => {
            return axios.patch(`${lmsConfig.baseUrl}${lmsConfig.endpointUrl.feature.add}/${courseId}`, {
                data: {
                    attributes: {
                        featured: true
                    }
                }
            }).then(response => {
                return response.data;
            }).catch(response => {
                console.log(response);
            });
        });
    },

    setToUnFeatured: function (courseId) {
            return axios.patch(`${lmsConfig.baseUrl}${lmsConfig.endpointUrl.feature.add}/${courseId}`, {
                data: {
                    attributes: {
                        featured: false
                    }
                }
            }).then(response => {
                return response.data;
            }).catch(response => {
                console.log(response);
            });
    }


};

export default FeatureSource;