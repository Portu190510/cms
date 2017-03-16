import React, { Component } from 'react';

class NotFoundComponent extends Component {
  componentDidMount() {
    window.componentHandler.upgradeAllRegistered();
  }

  render() {
    return (
      <div className="pageNotFoundBlock">PAGE NOT FOUND</div>
    );
  }
}

export default NotFoundComponent;