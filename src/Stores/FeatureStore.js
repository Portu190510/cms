import alt from '../Alt';
import _ from 'lodash';
import Actions from '../Actions/FeatureActions';

class FeatureStore {
  constructor() {
    this.bindActions(Actions);

    // State
    this.dataList = [];
    this.selectedFetures = [];
  }

  onFetchDataList(filterModel) {
    this.setState({ dataList: [] });
    this.setState({ selectedFetures: [] });
  }

  onAddFeatures(){

  }

  onUpdateDataList(response) {
    if(response && response.data){
    var data = response.data.map(function (item) {
      var attributes = item.attributes;
   
      return {
        id: item.id,
        name: attributes.title
      }
    });

    this.setState({ dataList: data });
  }
  console.log("NO RESPONSE");
  }
}

export default alt.createStore(FeatureStore, 'FeatureStore');