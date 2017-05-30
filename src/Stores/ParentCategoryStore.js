import alt from '../Alt';
import _ from 'lodash';
import Actions from '../Actions/ParentCategoryActions';
import FilterModel from '../Models/ParentCategoryFilterModel';

class ParentCategoryStore {
  constructor() {
    this.bindActions(Actions);

    // State
    this.dataList = [];
    this.parentCategoryList = [];
    this.filter = new FilterModel({});
  }

  onFetchDataList(filterModel) {
    this.setState({ filter: filterModel });
    this.setState({ dataList: [] });
  }

  onfetchCategoryList() {
    this.setState({ parentCategoryList: [] });
  }

  onUpdateCategoryList(response) {
    if (response && response.data) {
      var data = response.data.map(function (item) {
        var attributes = item.attributes;
        return {
          id: item.id,
          name: attributes.name
        }
      });
      this.setState({ parentCategoryList: data });
    }
  }

  onUpdateDataList(response) {
    if (response && response.data) {
      var data = response.data.map(function (item) {
        var attributes = item.attributes;

        return {
          id: item.id,
          title: attributes.label,
          status: attributes.status,
          descriptions: attributes.description,
          coverlink: attributes.category_image_url
        }
      });

      var filterModel = this.filter;
      //TODO
      if (response.links && response.links.last) {
        filterModel.totalPages = +(response.links.last.substring(response.links.last.indexOf("page%5Bnumber%5D=") + 17, response.links.last.indexOf("&page%5Bsize%5D")));
      }
      this.setState({ filter: filterModel });
      this.setState({ dataList: data });
    }
    console.log("NO RESPONSE");
  }
}

export default alt.createStore(ParentCategoryStore, 'ParentCategoryStore');