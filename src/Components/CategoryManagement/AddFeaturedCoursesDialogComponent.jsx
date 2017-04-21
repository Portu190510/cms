import React, { Component } from 'react';
import { Dialog, DialogTitle, DialogContent, Textfield, DialogActions, FABButton, Icon, List, ListItem, ListItemContent, ListItemAction, Checkbox, Button } from 'react-mdl';
import _ from 'lodash';
import Store from '../../Stores/FeatureStore';
import Actions from '../../Actions/FeatureActions';
import connectToStores from 'alt/utils/connectToStores';

class AddFeaturedCoursesDialogComponent extends Component {
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
        this.subcategoryId = this.props.subcategoryId;
        this.state = Store.getState();
    }

    handleOpenDialog() {
        this.setState({
            openDialog: true
        });
    }

    handleCloseDialog(isAdd) {
        if (isAdd && this.state.selectedFetures.length > 0) {
            Actions.addFeatures(this.state.selectedFetures, this.subcategoryId);
        }
        this.setState({ dataList: [] });
        this.setState({
            openDialog: false
        });
    }

    onClickCheckbox(id, e) {
        var newFeatures = this.state.selectedFetures;
        if (e._targetInst._hostNode.checked) {
            newFeatures.push(id);
        } else {
            _.remove(newFeatures, function (item) {
                return item == id;
            });
        }

        this.setState({ searchFeture: newFeatures })
    }

    searchFeture(searchFieldValue) {
        this.setState({
            dataList: [{ id: 0, name: 'addFeatures' }, { id: 1, name: 'SubcategoryComponent.jsx' }, { id: 2, name: 'componentDidMount' }, { id: 3, name: 'dataList' }, { id: 4, name: 'expandableIcon' }, { id: 5, name: 'subcategoryId' },
            { id: 45, name: 'addFeatures' }, { id: 534, name: 'SubcategoryComponent.jsx' }, { id: 345, name: 'componentDidMount' }, { id: 43, name: 'dataList' }, { id: 55, name: 'expandableIcon' }, { id: 345, name: 'subcategoryId' }]
        })
        if (searchFieldValue.inputRef.value.length > 0) {
            Actions.fetchDataList(searchFieldValue.inputRef.value);
        }
    }

    render() {
        var self = this;
        return (
            <div>
                <Button onClick={this.handleOpenDialog.bind(this)} ripple>
                    <i className="material-icons">add</i> Add Course
           </Button>
                <Dialog open={this.state.openDialog} style={{ width: '380px', top: '63.5px' }} onCancel={this.handleCloseDialog.bind(this)}>
                    <DialogTitle>Add Featured Course</DialogTitle>
                    <DialogContent>
                        <div>
                            <Textfield
                                ref="searchFieldValue"
                                label="Text..."
                                floatingLabel
                                expandableIcon="search"
                            />
                            <Button style={{ float: 'none', marginTop: '-12px' }} raised onClick={this.searchFeture.bind(this, this.refs.searchFieldValue)}>
                                <Icon name="search" />
                            </Button>
                            <List style={{ maxHeight: '400px', overflowY: 'auto', height: '400px' }}>
                                {
                                    this.state.dataList.map(function (item) {
                                        return <ListItem key={item.id}>
                                            <ListItemContent>{item.name}</ListItemContent>
                                            <ListItemAction>
                                                <Checkbox onClick={self.onClickCheckbox.bind(self, item.id)} />
                                            </ListItemAction>
                                        </ListItem>
                                    })
                                }
                            </List>
                        </div>
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

export default connectToStores(AddFeaturedCoursesDialogComponent);