import React, {Component} from 'react';
import {Textfield, Button} from 'react-mdl';
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
    AuthActions.login({username: this.refs.usernameInput.inputRef.value, password: this.refs.passwordInput.inputRef.value});
  }

  componentDidMount() {
    window
      .componentHandler
      .upgradeDom();
  }

  componentWillUnmount() {
    window
      .componentHandler
      .upgradeDom();
  }

  render() {
    var divError = (AuthStore.getState().error)
      ? (
        <p>{AuthStore
            .getState()
            .error}</p>
      )
      : null;
    return (
      <div>
        <div className="login-page">
          CyberU
          <div
            style={{
            fontSize: '20px',
            marginTop: '75px',
            marginLeft: '320px'
          }}>Content Management and then some</div>
        </div>
        <div className="login-form">
          <form onSubmit={this
            .onClickLogin
            .bind(this)}>
            <div className="mdl-textfield mdl-js-textfield">
              <Textfield
                ref="usernameInput"
                label="Email"
                style={{
                width: '250px'
              }}/>
            </div>
            <div className="mdl-textfield mdl-js-textfield">
              <Textfield
                ref="passwordInput"
                label="Password"
                style={{
                width: '250px'
              }}/>
            </div>
            <Button ripple>
              <i className="material-icons">input</i>
              Login</Button>
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