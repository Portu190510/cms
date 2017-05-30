import alt from '../Alt';
import Source from '../Sources/DomainSource';
import FilterModel from '../Models/DomainFilterModel';

class DomainActions {
    constructor() {
        this.generateActions('updateDataList');
    }

    createDomain(model) {
        var self = this;
        Source.create(model).then((dataList) => {
           self.actions.fetchDataList(new FilterModel({}));
        });

        return model
    }

    deleteDomain(domainId) {
        var self = this;
        Source.delete(domainId).then((dataList) => {
           self.actions.fetchDataList(new FilterModel({}));
        });

        return domainId;
    }

    fetchDataList(model) {
        var self = this;
        Source.fetch(model.getParams()).then((dataList) => {
            self.actions.updateDataList(dataList);
        });

        return model;
    }
}

export default alt.createActions(DomainActions);