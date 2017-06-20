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
    if (response && response.data) {
      var data = response.data.map(function (item) {
        var attributes = item.attributes;
        var parents = attributes.parents.data.map(function (source) {
          return source.attributes.label;
        });
        var featuredCourses = attributes.featured_courses.data.map(function (source) {
          return {
            id: source.id,
            name: source.attributes.title
          };
        });

        return {
          id: item.id,
          label: attributes.label,
          status: attributes.status,
          parentCategory: _.join(parents, '\n '),
          descriptions: attributes.description,
          coverlink: attributes.category_image_url,
          featuredCourses: featuredCourses
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

export default alt.createStore(SubcategoryStore, 'SubcategoryStore');