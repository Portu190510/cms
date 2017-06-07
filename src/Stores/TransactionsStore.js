import alt from '../Alt';
import _ from 'lodash';
import Actions from '../Actions/TransactionsActions';
import FilterModel from '../Models/TransactionsFilterModel';

class TransactionsStore {
    constructor() {
        this.bindActions(Actions);

        // State
        this.isSnackbarActive = false;
        this.focusedInput = null;
        this.fromDate = null;
        this.toDate = null;
        this.dataList = [];
        this.filter = new FilterModel({});
    }

    onExportSuccess(isSuccess) {
    if (!isSuccess) {
      this.isSnackbarActive = true;
    }
  }

    onFetchDataList(filterModel) {
        this.setState({ fromDate: filterModel.fromDate, toDate: filterModel.toDate });
        this.setState({ filter: filterModel });
        this.setState({ dataList: [] });
    }

    onUpdateDataList(response) {
        var data = response.data.map(function (item) {
            var attributes = item.attributes;
            return {
                date: (new Date(attributes.date)).toLocaleDateString('en-US'),
                learner_id: attributes.learner_id,
                learner_name: attributes.learner_name,
                course_id: (attributes.course_title || '') + ' ('+attributes.course_id+ ')',
                course_title: attributes.course_title,
                publisher_id: (attributes.publisher_name || '') + ' (' + (attributes.publisher_id || 'no instructor id') +')',
                price: '$'+ attributes.price
            }
        });

        var filterModel = this.filter;
        filterModel.totalResults = response.meta.total;
        filterModel.totalRevenue = response.meta.total_revenues;
        filterModel.totalPages = response.meta['total-pages'];

        this.setState({ filter: filterModel });
        this.setState({ dataList: data });
    }
}

export default alt.createStore(TransactionsStore, 'TransactionsStore');