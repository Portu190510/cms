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
    var data = dataList.map(function(item) {  return {
      userId: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      signupSource: item.signupSource,
      lastLoginDate: item.signupSources[0].lastLoginDateTime,
      signupDate: item.signupSources[0].signUpDateTime,
      publisherId: item.publisherId
    }
  });
    this.setState({dataList:data });
  }

  onFilterDataList(model) {
    var filteredList = this.dataList.filter(function(item){
            return item.FirstName.toLowerCase().search(model.FirstName.toLowerCase())!== -1;
        }); 
        this.setState({dataList: filteredList});
  }
}

export default alt.createStore(UserReportStore, 'UserReportStore');