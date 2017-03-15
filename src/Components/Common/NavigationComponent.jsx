import React, {Component} from 'react';
import {Link} from 'react-router';

class NavigationComponent extends Component {

componentDidMount() {
    window.componentHandler.upgradeDom();   
  }

  componentWillUnmount() {
    window.componentHandler.upgradeDom();   
  }
  render() {
    return (
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">CyberU</span>
        <nav className="mdl-navigation">
          <Link to="/courses-report" activeClassName="active" className="mdl-navigation__link" activeStyle={{ fontWeight: "bold" }}>Manage Courses</Link>
          <Link to="/user-report" activeClassName="active" className="mdl-navigation__link" activeStyle={{ fontWeight: "bold" }}>Users</Link>
        </nav>
      </div>
    );
  }
}

export default NavigationComponent;