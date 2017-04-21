import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, Textfield, DialogActions, Button } from 'react-mdl';
import { MDLSelectField } from 'react-mdl-select';

import Store from '../../Stores/ParentCategoryStore';
import Actions from '../../Actions/ParentCategoryActions';
import connectToStores from 'alt/utils/connectToStores';

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
    this.state = Store.getState();
    this.onAddCategory = props.onAddCategory;
  }

  handleOpenDialog() {
    Actions.fetchCategoryList();
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog(isAdd) {
    if (isAdd && this.isValidForm()) {
      this.onAddCategory({
        title: this.refs.title.inputRef.value,
        parentCategory: this.refs.parentCategory.state.value,
        secondaryParentCategory: this.refs.secondaryParentCategory.state.value
      });
    }

    if ((isAdd && this.isValidForm()) || !isAdd) {
      this.refs.title.inputRef.value = '';
      this.refs.parentCategory.state.value = '';
      this.refs.secondaryParentCategory.state.value = '';
      this.setState({
        openDialog: false
      });
    }
  }

  isValidForm() {
    return this.refs.title.inputRef.value.length > 0 && this.refs.parentCategory.state.value.length > 0;
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleOpenDialog.bind(this)} ripple>
          <i className="material-icons">add</i> Add Subcategory
           </Button>
        <Dialog open={this.state.openDialog} onCancel={this.handleCloseDialog.bind(this)}>
          <DialogTitle>Add Category</DialogTitle>
          <DialogContent>
            <form>
              <Textfield floatingLabel ref="title" required label="Title" />
              <MDLSelectField
                label="Parent Category"
                ref="parentCategory"
                autocomplete
                floatingLabel
                onChange={() => { console.log(this.refs.parentCategory) }}
                items={this.state.parentCategoryList || []}
                keyField="id"
                valueField="name"
              />
              <MDLSelectField
                label="Secondary Parent Category"
                ref="secondaryParentCategory"
                autocomplete
                floatingLabel
                onChange={() => { console.log(this.refs.secondaryParentCategory) }}
                items={this.state.parentCategoryList || []}
                keyField="id"
                valueField="name"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={this.handleCloseDialog.bind(this, true)}>Add</Button>
            <Button type='button' onClick={this.handleCloseDialog.bind(this, false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connectToStores(AddSubCategoryDialogComponent);