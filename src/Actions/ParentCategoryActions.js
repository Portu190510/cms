import alt from '../Alt';
import Source from '../Sources/ParentCategorySource';

class ParentCategoryActions {
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
}

export default alt.createActions(ParentCategoryActions);