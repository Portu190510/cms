import alt from '../Alt';
import Source from '../Sources/ParentCategorySource';
import FilterModel from '../Models/ParentCategoryFilterModel';

class ParentCategoryActions {
    constructor() {
        this.generateActions('updateDataList','updateCategoryList');
    }

    fetchDataList(model) {
        var self = this;
        Source.fetch(model.getParams()).then((dataList) => {
            self.actions.updateDataList(dataList);
        });

        return model;
    }

    fetchCategoryList(){
        var self = this;
        Source.fetchCategoryList().then((dataList) => {
            self.actions.updateCategoryList(dataList);
        });

        return;
    }
}

export default alt.createActions(ParentCategoryActions);