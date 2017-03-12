import React, { Component } from 'react';

class HeaderComponent extends Component {
  render() {
    return ( <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <h4 style={{ marginLeft: '5px'}}>CyberU Mission Control</h4>
            <div className="mdl-layout-spacer"></div>
              <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
                <a className="mdl-button mdl-js-button mdl-button--icon" style={{position:'initial'}}>
                   <i className="material-icons">input</i>
                </a>
              </div>
          </div>
      </header>
    );
  }
}

export default HeaderComponent;