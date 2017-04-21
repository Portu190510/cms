import Config from '../config';
import axios from 'axios';

var FeatureSource = {
    fetch: function (searchFieldValue) {
        return axios.get(`${Config.apiUrl}${Config.endpointUrl.feature.fetch}?searchFieldValue=${searchFieldValue}`)
            .then(response => {
                return response.data;
            }).catch(response => {
                console.log(response);
                return [{id:1, name:'a'},{id:2, name:'b'},{id:3, name:'c'},{id:4, name:'d'}]
            });
    },
    addFeatures: function (featuresIdArray,subcategoryId) {
        return axios.post(`${Config.apiUrl}${Config.endpointUrl.feature.add}`, {featuresIdArray:featuresIdArray, subcategoryId:subcategoryId}).then(response => {
            return response.data;
        }).catch(response => {
            console.log(response);
        });
    }
};

export default FeatureSource;