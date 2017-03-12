import React, { Component } from 'react';
import Router from 'react-router';
import AuthStore from './../../Stores/AuthStore';
import AuthActions from './../../Actions/AuthActions';
import connectToStores from 'alt/utils/connectToStores';

class Login extends Component {
  static getStores() {
    return [AuthStore];
  }

  static getPropsFromStores() {
    return AuthStore.getState();
  }

  onClickLogin(e) {
      e.preventDefault();
    AuthActions.login({
      username: this.refs.usernameInput.value,
      password: this.refs.passwordInput.value
    });
  }

  render() {
    var divError = (AuthStore.getState().error) ? (<p>{AuthStore.getState().error}</p>) : null;

    return (
      <div>
        <div className="login-page">
          CyberU
        </div>
          <div className="login-form">
            <form onSubmit={this.onClickLogin.bind(this)}>
            <div className="mdl-textfield mdl-js-textfield" style={{ padding: "24px 0"}}>
                <input className="mdl-textfield__input" type="text" id="usernameInput" ref="usernameInput"/>
                            <label className="mdl-textfield__label" htmlFor="usernameInput">User name</label>
            </div>
            <div className="mdl-textfield mdl-js-textfield" style={{ padding: "24px 0"}}>
                <input className="mdl-textfield__input" type="text" id="passwordInput" ref="passwordInput" />
            <label className="mdl-textfield__label" htmlFor="passwordInput">Password</label>
            </div>
            <button className="mdl-button mdl-js-button">
                    <i className="material-icons">input</i> Login
            </button>
    </form>
    <div className="mdl-textfield__error">
       {divError}
      </div>
       
        </div>
    </div>
    );
  }
}

export default connectToStores(Login);