import React, {Component} from 'react';
import AuthStore from '../../Stores/AuthStore';
import AuthActions from '../../Actions/AuthActions';

class HeaderComponent extends Component {
  constructor(props){
    super(props);
    

    try{
      this.state = {userName:AuthStore.getState().user.name};
    }catch(e){
      this.state = {userName:''};
    }
  }
  onLogout(replaceState) {
    AuthActions.logout();
  }

componentDidMount() {
    window.componentHandler.upgradeDom(); 
  }

  componentWillUnmount() {
    window.componentHandler.upgradeDom();
  }
  render() {
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <h4 className="header-title">CyberU Mission Control</h4>
          <div className="mdl-layout-spacer header-user-name"> Hello {this.state.userName}</div>
          <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right" style={{width:'auto'}}>
            <a className="mdl-button mdl-js-button mdl-button--icon header-logout-button" onClick={this.onLogout.bind(this)}>
              <i className="material-icons">input</i>
            </a>
          </div>
        </div>
      </header>
    );
  }
}

export default HeaderComponent;