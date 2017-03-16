import React, { Component } from 'react';
import NavigationComponent from "./Components/Common/NavigationComponent";
import HeaderComponent from "./Components/Common/HeaderComponent";
import './App.css';

class App extends Component {
  componentDidMount() {
    window.componentHandler.upgradeDom();
  }

  componentWillUnmount() {
    window.componentHandler.upgradeDom();
  }
  render() {
    return (
      <div
        className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <HeaderComponent />
        <NavigationComponent />
        <main className="mdl-layout__content main-box">
          <div className="page-content">
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }
}

export default App;