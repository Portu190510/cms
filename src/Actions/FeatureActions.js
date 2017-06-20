import alt from '../Alt';
import Source from '../Sources/FeatureSource';

class FeatureActions {
    constructor() {
        this.generateActions('updateDataList');
    }

    fetchDataList(subcategoryId, searchFieldValue) {
        var self = this;
        Source.fetch(subcategoryId, searchFieldValue).then((dataList) => {
            self.actions.updateDataList(dataList);
        });

        return;
    }

    addFeatures(featuresIdArray) {
        var self = this;
        Source.addFeatures(featuresIdArray);

        return;
    }
}

export default alt.createActions(FeatureActions);