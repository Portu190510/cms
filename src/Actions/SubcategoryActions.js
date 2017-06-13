import alt from '../Alt';
import Source from '../Sources/SubсategorySource';
import FeaturedSource from '../Sources/FeatureSource';
import FilterModel from '../Models/SubcategoryFilterModel';

class SubсategoryActions {
    constructor() {
        this.generateActions('updateDataList');
    }

    fetchDataList(model) {
        var self = this;
        Source.fetch(model.getParams()).then((dataList) => {
            self.actions.updateDataList(dataList);
        });

        return model;
    }

    addCategory(model){
        var self = this;
        Source.addCategory(model).then((dataList) => {
            self.actions.fetchDataList(new FilterModel({}));
        });

        return;
    }

    setToUnFeatured(courseId) {
        var self = this;
        FeaturedSource.setToUnFeatured(courseId).then((response) => {
            self.actions.fetchDataList(new FilterModel({}));
        });

        return;
    }
}

export default alt.createActions(SubсategoryActions);