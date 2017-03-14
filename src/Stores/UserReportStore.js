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
      signupSource: item.signupSources[0].source,
      lastLoginDate: (new Date(item.signupSources[0].lastLoginDateTime)).toDateString(),
      signupDate: (new Date(item.signupSources[0].signUpDateTime)).toDateString(),
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