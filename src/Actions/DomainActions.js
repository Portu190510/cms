import alt from '../Alt';
import DomainSource from '../Sources/DomainSource';

class DomainActions {
    constructor() {
        this.generateActions('updateDataList');
    }

    createDomain(model) {
        var self = this;
        DomainSource.create(model).then((dataList) => {

        });

        return model
    }

    deleteDomain(domainId) {
        var self = this;
        DomainSource.delete(domainId).then((dataList) => {

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