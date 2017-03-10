import React, { Component } from 'react';
import UserSearchComponent from "./UserSearchComponent";
import UserGridComponent from "./UserGridComponent";

const  testDataList = [{UserId:'123',FirstName:'Gomer',LastName:'Simpson'
        ,Email:'mail@gmail.com',SignupSource:'Facebook',LastLoginDate:'Today',SignupDate:'Today',PublisherId:'234234',},
        {UserId:'123',FirstName:'Lisa',LastName:'Simpson'
        ,Email:'mail@gmail.com',SignupSource:'Facebook',LastLoginDate:'Today',SignupDate:'Today',PublisherId:'234234',}];

class UserReportComponent extends Component {
    constructor(props){
        super(props);
        this.state = { dataList: testDataList};
                          
        this.filterDataList = this.filterDataList.bind(this);
    }
             
    filterDataList(text){
        var filteredList = this.props.data.items.filter(function(item){
            return item.toLowerCase().search(text.toLowerCase())!== -1;
        }); 
        this.setState({items: filteredList});
    }
  render() {
    return (
      <div className="mdl-card mdl-shadow--2dp" style={{width: '100%'}}>
  <div className="mdl-card__title">
  </div>
  <div className="mdl-card__supporting-text">
      <UserSearchComponent filterCallBack="{filterDataList}"></UserSearchComponent>
  </div>
  <div className="mdl-card__actions mdl-card--border">
    <UserGridComponent dataList={this.state.dataList}></UserGridComponent>
  </div>
  <div className="mdl-card__menu">
    
  </div>
</div>
    );
  }
}

export default UserReportComponent;