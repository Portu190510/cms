import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, Textfield, DialogActions, Button } from 'react-mdl';

class AddCategoryDialogComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onAddCategory = props.onAddCategory;
  }

  handleOpenDialog() {
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog(isAdd) {

    if (isAdd && this.isValidForm()) {
      this.onAddCategory({ title: this.refs.title.inputRef.value, description: this.refs.descriptions.inputRef.value });
    }

    if ((isAdd && this.isValidForm()) || !isAdd) {
      this.refs.title.inputRef.value = '';
      this.refs.descriptions.inputRef.value = '';
      this.setState({
        openDialog: false
      });
    }
  }

  isValidForm() {
    return this.refs.title.inputRef.value.length > 0 && this.refs.descriptions.inputRef.value.length > 0;
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleOpenDialog.bind(this)} ripple>
          <i className="material-icons">add</i> Add parent category
           </Button>
        <Dialog open={this.state.openDialog} onCancel={this.handleCloseDialog.bind(this)}>
          <DialogTitle>Add Category</DialogTitle>
          <DialogContent>
            <form>
              <Textfield floatingLabel ref="title" required label="Title" />
              <Textfield floatingLabel ref="descriptions" rows={5} required label="Description" />
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

export default AddCategoryDialogComponent;