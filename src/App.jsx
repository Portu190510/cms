import React, { Component } from 'react';
import './App.css';
import UserReportComponent from './Components/UserReportComponent.jsx';

class App extends Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
  <header className="mdl-layout__header">
    <div className="mdl-layout__header-row">
      <h4>CyberU Mission Control</h4>
      <div className="mdl-layout-spacer"></div>
      <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
         <a className="mdl-button mdl-js-button mdl-button--icon" style={{position:'initial'}}>
          <i className="material-icons">input</i>
        </a>
      </div>
    </div>
  </header>
  <div className="mdl-layout__drawer">
    <span className="mdl-layout-title">CyberU</span>
    <nav className="mdl-navigation">
      <a className="mdl-navigation__link" href="">Users</a>
    </nav>
  </div>
  <main className="mdl-layout__content">
    <div className="page-content">
      <UserReportComponent></UserReportComponent>
      
    </div>
  </main>
</div>
    );
  }
}

export default App;

