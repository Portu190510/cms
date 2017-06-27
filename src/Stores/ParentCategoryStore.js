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

  onFetchCategoryList() {
    this.setState({ parentCategoryList: [] });
  }

  onAddParentCategory() {

  }

  onUpdateCategoryList(response) {
    if (response && response.data) {
      var data = response.data.map(function (item) {
        var attributes = item.attributes;
        return {
          id: item.id,
          name: attributes.label,
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
          label: attributes.label,
          status: attributes.status,
          descriptions: attributes.description,
          coverlink: attributes.category_image_url
        }
      });

      var filterModel = this.filter;
      filterModel.totalResults = response.meta.total;
      filterModel.totalPages = response.meta.total_pages;

      this.setState({ filter: filterModel });
      this.setState({ dataList: data });
    }
    console.log("NO RESPONSE");
  }
}

export default alt.createStore(ParentCategoryStore, 'ParentCategoryStore');