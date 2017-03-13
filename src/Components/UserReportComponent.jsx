import React, {Component} from 'react';
import UserGridComponent from "./UserGridComponent";

class UserReportComponent extends Component {

  componentDidMount() {
    window.componentHandler.upgradeDom();      // <==
  }

  componentWillUnmount() {
    window.componentHandler.upgradeDom();   // <==
  }
  render() {
    return (
      <UserGridComponent></UserGridComponent>
    );
  }
}

export default UserReportComponent;