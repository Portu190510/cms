import alt from '../Alt';
import Source from '../Sources/TransactionsSource';
import fileDownload from 'react-file-download';

class TransactionsActions {
    constructor() {
        this.generateActions('updateDataList', 'exportSuccess');
    }

    fetchDataList(model) {
        var self = this;

        Source.fetch(model.getParams())
            .then((dataList) => {
                self.actions.updateDataList(dataList);
            });

        return model;
    }

    exportToCsv(idArray) {
        var self = this;
        Source.exportToCsv(idArray)
            .then((csvByteArray) => {
                if (csvByteArray) {
                    fileDownload(csvByteArray, 'transactionsReport.csv');
                    self.actions.exportSuccess(true);
                } else {
                    console.log('csv is empty');
                    self.actions.exportSuccess(false);
                }
            });
    }
}

export default alt.createActions(TransactionsActions);