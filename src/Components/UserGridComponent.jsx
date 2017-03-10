import React, { Component } from 'react';

class UserGridComponent extends Component {
    constructor(props){
        super(props);
        this.state = { dataList: this.props.dataList};
    }
  render() {
    return (
      <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp"
       style={{width:'100%'}}>
  <thead>
    <tr>
      <th className="mdl-data-table__cell--non-numeric">User ID </th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email Address</th>
      <th>Sign up Source</th>
      <th>Last Login Date</th>
      <th>Sign Up Date </th>
      <th>Publisher ID</th>
    </tr>
  </thead>
  <tbody>
    
        {
            this.state.dataList.map(function(item){
                return (<tr>
                    <td className="mdl-data-table__cell--non-numeric">{item.UserId}</td>
                    <td>{item.FirstName}</td>
                    <td>{item.LastName}</td>
                    <td>{item.Email}</td>
                    <td>{item.SignupSource}</td>
                    <td>{item.LastLoginDate}</td>
                    <td>{item.SignupDate}</td>
                    <td>{item.PublisherId}</td>
                </tr>);
            })
        }
      
  </tbody>
</table>
    );
  }
}

export default UserGridComponent;