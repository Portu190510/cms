import React, { Component } from 'react';
import { Link } from 'react-router';

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
            <Link to="/domain-management" activeClassName="active" className="mdl-navigation__link" activeStyle={{ fontWeight: "bold" }}>Domain Management</Link>
            <Link to="/category-management" activeClassName="active" className="mdl-navigation__link" activeStyle={{ fontWeight: "bold" }}>Category Management</Link>
            <Link to="/in-review-courses" activeClassName="active" className="mdl-navigation__link" activeStyle={{ fontWeight: "bold" }}>In Review Courses</Link>
          <div className="naviagation-separator"> Reports</div>
            <Link to="/reports/courses-report" activeClassName="active" className="mdl-navigation__link" activeStyle={{ fontWeight: "bold" }}>Course Catalog</Link>
            <Link to="/reports/user-report" activeClassName="active" className="mdl-navigation__link" activeStyle={{ fontWeight: "bold" }}>Users</Link>
            <Link to="/reports/course-registration-report" activeClassName="active" className="mdl-navigation__link" activeStyle={{ fontWeight: "bold" }}>Course Registrations</Link>
             <Link to="/reports/courses-per-category-report" activeClassName="active" className="mdl-navigation__link" activeStyle={{ fontWeight: "bold" }}>Courses Per Category</Link>
            <Link to="/reports/registration-report" activeClassName="active" className="mdl-navigation__link" activeStyle={{ fontWeight: "bold" }}>Transactions</Link>
        </nav>
      </div>
    );
  }
}

export default NavigationComponent;