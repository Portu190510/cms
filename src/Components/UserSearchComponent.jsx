import React, { Component } from 'react';

class UserSearchComponent extends Component {
    constructor(props){
        super(props);
        this.filterCallBack = this.props.filterCallBack;
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    onSearchSubmit(e){
        e.
       this.filterCallBack(e.val);
    } 

  render() {
    return (
      <form onSubmit={this.onSearchSubmit}>
            <div className="mdl-textfield mdl-js-textfield">
                <input className="mdl-textfield__input" type="text" id="firstName" />
            <label className="mdl-textfield__label" htmlFor="firstName">First name</label>
            </div>
            <div className="mdl-textfield mdl-js-textfield">
                <input className="mdl-textfield__input" type="text" id="lastName" />
            <label className="mdl-textfield__label" htmlFor="lastName">Last name</label>
            </div>
            <div className="mdl-textfield mdl-js-textfield">
                <input className="mdl-textfield__input" type="text" id="userId" />
            <label className="mdl-textfield__label" htmlFor="userId">User ID</label>
            </div>
            <div className="mdl-textfield mdl-js-textfield">
                <input className="mdl-textfield__input" type="text" id="email" />
            <label className="mdl-textfield__label" htmlFor="email">Email</label>
            </div>
            <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                    <i className="material-icons">search</i>
            </button>
            <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                    <i className="material-icons">file_download</i>
            </button>
    </form>
    );
  }
}

export default UserSearchComponent;