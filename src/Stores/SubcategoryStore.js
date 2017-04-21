import alt from '../Alt';
import _ from 'lodash';
import Actions from '../Actions/SubcategoryActions';
import FilterModel from '../Models/SubcategoryFilterModel';

class SubcategoryStore {
  constructor() {
    this.bindActions(Actions);

    // State
    this.dataList = [];
    this.filter = new FilterModel({});
  }

  onFetchDataList(filterModel) {
    this.setState({ filter: filterModel });
    this.setState({ dataList: [] });
  }

  onUpdateDataList(response) {
    if(response && response.data){
    var data = response.data.map(function (item) {
      var attributes = item.attributes;
   
      return {
        id: item.id,
        title: attributes.title,
        status: attributes.status,
        parentCategory: attributes.parentCategory,
        descriptions: attributes.descriptions,
        coverlink: attributes.coverlink,
        featuredCourses : attributes.featuredCourses
      }
    });

    var filterModel = this.filter;
    //TODO
    if(response.links.last)
    {
      filterModel.totalPages = +(response.links.last.substring(response.links.last.indexOf("page%5Bnumber%5D=") + 17, response.links.last.indexOf("&page%5Bsize%5D")));
    }
    this.setState({ filter: filterModel });
    this.setState({ dataList: data });
  }
  console.log("NO RESPONSE");
  }
}

export default alt.createStore(SubcategoryStore, 'SubcategoryStore');