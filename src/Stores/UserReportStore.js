import alt from '../Alt';
import UserReportActions from '../Actions/UserReportActions';

class UserReportStore {
  constructor() {
    this.bindActions(UserReportActions);

    // State
    this.dataList = [];
  }

  onFetchDataList(){
    this.setState({dataList: []});
    
  }

  onUpdateDataList(dataList){
    this.setState({dataList: dataList});
  }

  onFilterDataList(model) {
    var filteredList = this.dataList.filter(function(item){
            return item.FirstName.toLowerCase().search(model.FirstName.toLowerCase())!== -1;
        }); 
        this.setState({dataList: filteredList});
  }
}

export default alt.createStore(UserReportStore, 'UserReportStore');