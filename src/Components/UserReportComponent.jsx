import React, { Component } from 'react';
import UserGridComponent from "./UserGridComponent";

const  testDataList = [{UserId:'123',FirstName:'Gomer',LastName:'Simpson'
        ,Email:'mail@gmail.com',SignupSource:'Facebook',LastLoginDate:'Today',SignupDate:'Today',PublisherId:'234234',},
        {UserId:'123',FirstName:'Lisa',LastName:'Simpson'
        ,Email:'mail@gmail.com',SignupSource:'Facebook',LastLoginDate:'Today',SignupDate:'Today',PublisherId:'234234',}];

class UserReportComponent extends Component {
    constructor(props){
        super(props);
        this.state = { dataList: testDataList};
    }
  render() {
    return (
            <UserGridComponent dataList={this.state.dataList}></UserGridComponent>
    );
  }
}

export default UserReportComponent;