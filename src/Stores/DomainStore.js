import alt from '../Alt';
import _ from 'lodash';
import DomainActions from '../Actions/DomainActions';
import DomainFilterModel from '../Models/DomainFilterModel';

class DomainStore {
    constructor() {
        this.bindActions(DomainActions);

        // State
        this.dataList = [];
        this.filter = new DomainFilterModel({});
    }

    onCreate(domainModel){
    }

    onDelete(domainId){

    }

    onFetchDataList(filterModel) {
        this.setState({ filter: filterModel });
        this.setState({ dataList: [] });
    }

    onUpdateDataList(dataList) {
        var data = dataList.map(function (item) {
            return {
                id: item.id,
                domain: item.domain,
                stgOrPrd: item.stgOrPrd,
                isEnabled: item.isEnabled,
                purpose: item.purpose
            }
        });
        this.setState({ dataList: data });
    }
}

export default alt.createStore(DomainStore, 'DomainStore');