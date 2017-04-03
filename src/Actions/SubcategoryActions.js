import alt from '../Alt';
import Source from '../Sources/SubсategorySource';

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
}

export default alt.createActions(SubсategoryActions);