import alt from '../Alt';
import Source from '../Sources/FeatureSource';

class FeatureActions {
    constructor() {
        this.generateActions('updateDataList');
    }

    fetchDataList(searchFieldValue) {
        var self = this;
        Source.fetch(searchFieldValue).then((dataList) => {
            self.actions.updateDataList(dataList);
        });

        return;
    }

    addFeatures(featuresIdArray,subcategoryId) {
        var self = this;
        Source.addFeatures(featuresIdArray,subcategoryId).then((response) => {
            //TODO
        });

        return;
    }
}

export default alt.createActions(FeatureActions);