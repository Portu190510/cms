import React, { Component } from 'react';

class UserSearchComponent extends Component {
    constructor(props){
        super(props);
        this.filterCallBack = this.props.filterCallBack;
        this.filterModel = {FirstName: '', LastName: '', UserId: '', Email: ''};
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }
    
    validateField(fieldValue){
            if(fieldValue && fieldValue.length>0){
                return true;
            }

            return false;
    }
    onSearchSubmit(e){
        e.preventDefault();
        var model ={};
        for(var key in this.refs ){
           model[key] = this.refs[key].value;
        }

        this.filterCallBack(model);
    } 

  render() {
    return (
      <form onSubmit={this.onSearchSubmit}>
            <div className="mdl-textfield mdl-js-textfield">
                <input className="mdl-textfield__input" type="text" id="firstName" ref="FirstName"/>
                            <label className="mdl-textfield__label" htmlFor="firstName">First name</label>
            </div>
            <div className="mdl-textfield mdl-js-textfield">
                <input className="mdl-textfield__input" type="text" id="lastName" ref="LastName" />
            <label className="mdl-textfield__label" htmlFor="lastName">Last name</label>
            </div>
            <div className="mdl-textfield mdl-js-textfield">
                <input className="mdl-textfield__input" type="text" id="userId" ref="UserId" />
            <label className="mdl-textfield__label" htmlFor="userId">User ID</label>
            </div>
            <div className="mdl-textfield mdl-js-textfield">
                <input className="mdl-textfield__input" type="text" id="email" ref="Email" />
            <label className="mdl-textfield__label" htmlFor="email">Email</label>
            </div>
            <button className="mdl-button mdl-js-button">
                    <i className="material-icons">search</i> Search
            </button>
            <button className="mdl-button mdl-js-button">
                    <i className="material-icons">file_download</i> Export to CSV
            </button>
    </form>
    );
  }
}

export default UserSearchComponent;