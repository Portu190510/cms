import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, Textfield, DialogActions, Button } from 'react-mdl';
import { MDLSelectField } from 'react-mdl-select';
import _ from 'lodash';

import FilterModel from '../../Models/ParentCategoryFilterModel';
import Store from '../../Stores/ParentCategoryStore';
import Actions from '../../Actions/ParentCategoryActions';
import connectToStores from 'alt/utils/connectToStores';

const defaultStatusList = [{ id: 0, name: 'deleted' },
{ id: 1, name: 'active' },
{ id: 2, name: 'inactive' }];

class AddSubCategoryDialogComponent extends Component {
  static getStores() {
    return [Store];
  }

  static getPropsFromStores() {
    return Store.getState();
  }

  componentDidMount() {
    Store.listen(this.onChange);
    window.componentHandler.upgradeDom();
  }

  componentWillUnmount() {
    window.componentHandler.upgradeDom();
    Store.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      title: '', descriptions: '', id: null
    };
    this.onAddCategory = props.onAddCategory.bind(this);
    this.onUpdateCategory = props.onUpdateCategory.bind(this);
  }

  handleOpenDialog(item) {
    Actions.fetchCategoryList();
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
      this.refs.parentCategory.state.value = item.parentCategory;
    } else {
      this.refs.status.state.value = defaultStatusList[1].name;
    }
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog(isAdd) {
    if (isAdd && this.isValidForm()) {
      var self = this;
      var primCat = _.find(this.refs.parentCategory.state.items, function (item) {
        return item.name == self.refs.parentCategory.state.value;
      });
      var secCat = _.find(this.refs.parentCategory.state.items, function (item) {
        return item.name == self.refs.secondaryParentCategory.state.value;
      });

      var parent_ids = [];
      if (primCat) {
        parent_ids.push(primCat.id);
      }
      if (secCat) {
        parent_ids.push(secCat.id);
      }

      var model = {
        data: {
          attributes: {
            label: this.state.title,
            level: 2,
            description: this.state.descriptions,
            status: this.refs.status.state.value,
            parent_ids: parent_ids,
          }
        }
      };

      this.state.id ? this.onUpdateCategory(model, this.state.id) : this.onAddCategory(model);
    }

    if ((isAdd && this.isValidForm()) || !isAdd) {
      this.refs.status.state.value = '';
      this.refs.parentCategory.state.value = '';
      this.refs.secondaryParentCategory.state.value = '';
      this.setState({
        openDialog: false,
        title: '',
        descriptions: '',
        id: null
      });
    }
  }

  isValidForm() {
    return this.state.title.length > 0 && this.refs.parentCategory.state.value.length > 0;
  }

  validateField(item){
    return item && item.state && item.state.value != '' ? '' : 'is-invalid'
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleOpenDialog.bind(this)} ripple>
          <i className="material-icons">add</i> Add Subcategory
           </Button>
        <Dialog open={this.state.openDialog} onCancel={this.handleCloseDialog.bind(this)}>
          <DialogTitle>{this.state.id ? 'Edit' : 'Add'} Sub Category</DialogTitle>
          <DialogContent>
            <form>
              <Textfield floatingLabel value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} required label="Title" />
              <Textfield floatingLabel value={this.state.descriptions} onChange={(event) => this.setState({ descriptions: event.target.value })} rows={5} required label="Description" />
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
              <MDLSelectField
                label="Parent Category"
                ref="parentCategory"
                autocomplete
                required
                floatingLabel
                className={this.validateField(this.refs.parentCategory)}
                onChange={(val) => {
                  debugger;
                  this.className = this.validateField(val)
                 }}
                items={this.state.parentCategoryList || []}
                keyField="id"
                valueField="name"
              />
              <MDLSelectField
                label="Secondary Parent Category"
                ref="secondaryParentCategory"
                autocomplete
                floatingLabel
                onChange={() => {
                  
                 }}
                items={this.state.parentCategoryList || []}
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

export default AddSubCategoryDialogComponent;