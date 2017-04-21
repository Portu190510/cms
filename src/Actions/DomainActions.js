import alt from '../Alt';
import DomainSource from '../Sources/DomainSource';
import DomainFilterModel from '../Models/DomainFilterModel';

class DomainActions {
    constructor() {
        this.generateActions('updateDataList');
    }

    createDomain(model) {
        var self = this;
        DomainSource.create(model).then((dataList) => {
           self.actions.fetchDataList(new DomainFilterModel({}));
        });

        return model
    }

    deleteDomain(domainId) {
        var self = this;
        DomainSource.delete(domainId).then((dataList) => {
           self.actions.fetchDataList(new DomainFilterModel({}));
        });

        return domainId;
    }

    fetchDataList(model) {
        var self = this;
        DomainSource.fetch(model.getParams()).then((dataList) => {
            self.actions.updateDataList(dataList);
        });

        return model;
    }
}

export default alt.createActions(DomainActions);