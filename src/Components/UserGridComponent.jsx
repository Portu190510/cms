import React, { Component } from 'react';
import UserSearchComponent from "./UserSearchComponent";
import {Pagination} from 'react-bootstrap';

class UserGridComponent extends Component {
    constructor(props){
        super(props);
        this.state = { dataList: this.props.dataList, activePage:15};
                              
        this.filterDataList = this.filterDataList.bind(this);
    }

    nextPage(){

    }

    filterDataList(model){
        var filteredList = this.state.dataList.filter(function(item){
            return item.FirstName.toLowerCase().search(model.FirstName.toLowerCase())!== -1;
        }); 
        this.setState({dataList: filteredList});
    }

  render() {
    return ( <div className="mdl-card mdl-shadow--2dp" style={{width: '100%'}}>
                <div className="mdl-card__title"> </div>
                <div className="mdl-card__supporting-text">
                  <UserSearchComponent filterCallBack={this.filterDataList}></UserSearchComponent>
                </div>
                <div className="mdl-card__actions mdl-card--border"></div>
                  <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp" style={{width: 'inherit'}}>
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
                      <Pagination
                prev
                next
                first
                last
                ellipsis={false}
                boundaryLinks
                items={this.state.dataList}
                maxButtons={3}
                activePage={1}
                onSelect={this.nextPage} />
                        <div className="mdl-card__menu">   </div>
              </div>);
        }
}

export default UserGridComponent;