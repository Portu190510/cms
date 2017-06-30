import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, Textfield, DialogActions, Button } from 'react-mdl';
import { MDLSelectField } from 'react-mdl-select';
import _ from 'lodash';
const defaultStatusList = [{ id: 0, name: 'deleted' },
{ id: 1, name: 'active' },
{ id: 2, name: 'inactive' }];

class AddCategoryDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '', descriptions: '', id: null
    };
    this.onAddCategory = props.onAddCategory;
    this.onUpdateCategory = props.onUpdateCategory;
  }

  handleOpenDialog(item) {
    if (item && item.id) {
      var status = _.find(defaultStatusList, function (el) {
        return el.name == item.status;
      });
      this.setState({
        id: item.id,
        title: item.label,
        descriptions: item.descriptions || ''
      });

      this.refs.status.state.value = status.name;
    }else{
      this.refs.status.state.value = defaultStatusList[1].name;
    }

    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog(isAdd) {

    if (isAdd && this.isValidForm()) {
      var model = {
        data: {
          attributes: {
            label: this.state.title,
            level: 1,
            description: this.state.descriptions,
            pop_score: 0,
            status: this.refs.status.state.value,
          }
        }
      };
      this.state.id ? this.onUpdateCategory(model, this.state.id) : this.onAddCategory(model);
    }

    if ((isAdd && this.isValidForm()) || !isAdd) {
      this.refs.status.state.value = '';
      this.setState({
        openDialog: false,
        title: '',
        descriptions: '',
        id: null
      });
    }
  }

  isValidForm() {
    return this.state.title.length > 0 && this.state.descriptions.length > 0;
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleOpenDialog.bind(this)} ripple>
          <i className="material-icons">add</i>Add parent category
           </Button>
        <Dialog open={this.state.openDialog} onCancel={this.handleCloseDialog.bind(this)}>
          <DialogTitle> {this.state.id ? 'Edit' : 'Add'} Category</DialogTitle>
          <DialogContent>
            <form>
              <Textfield floatingLabel value={this.state.title} onChange={ (event) => this.setState({title: event.target.value})} required label="Title" />
              <Textfield floatingLabel value={this.state.descriptions} onChange={ (event) => this.setState({descriptions: event.target.value})} rows={5} required label="Description" />
              <MDLSelectField
                label="Status"
                ref='status'
                autocomplete
                required
                floatingLabel
                onChange={(val) => { }}
                items={defaultStatusList || []}
                keyField="id"
                valueField="name"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={this.handleCloseDialog.bind(this, true)}>{this.state.id ? 'Update' : 'Add'}</Button>
            <Button type='button' onClick={this.handleCloseDialog.bind(this, false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddCategoryDialogComponent;