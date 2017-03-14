import React, {Component} from 'react';

const testDataList = [
  {
    UserId: '123',
    FirstName: 'Gomer',
    LastName: 'Simpson',
    Email: 'mail@gmail.com',
    SignupSource: 'Facebook',
    LastLoginDate: 'Today',
    SignupDate: 'Today',
    PublisherId: '234234'
  }, {
    UserId: '123',
    FirstName: 'Lisa',
    LastName: 'Simpson',
    Email: 'mail@gmail.com',
    SignupSource: 'Facebook',
    LastLoginDate: 'Today',
    SignupDate: 'Today',
    PublisherId: '234234'
  }
];

class CoursesReportComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: testDataList
    };

    this.filterDataList = this.filterDataList.bind(this);
  }

  componentDidMount() {
    window.componentHandler.upgradeDom();
  }

  componentWillUnmount() {
    window.componentHandler.upgradeDom();
  }

  filterDataList(text) {
    var filteredList = this
      .props
      .data
      .items
      .filter(function (item) {
        return item
          .toLowerCase()
          .search(text.toLowerCase()) !== -1;
      });
    this.setState({items: filteredList});
  }
  render() {
    return (
      <div
        className="mdl-card mdl-shadow--2dp"
        style={{
        width: '100%'
      }}>
        Courses
      </div>
    );
  }
}

export default CoursesReportComponent;