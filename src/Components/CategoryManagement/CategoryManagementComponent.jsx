import React, { Component } from 'react';
import { Tabs, Tab } from 'react-mdl';

import ParentCategoryComponent from './ParentCategoryComponent';
import SubcategoryComponent from './SubcategoryComponent';

class CategoryManagementComponent extends Component {
    componentDidMount() {
        window.componentHandler.upgradeDom();
    }

    componentWillUnmount() {
        window.componentHandler.upgradeDom();
    }

    onChange(state) {
        this.setState(state);
    }

    constructor(props) {
        super(props);
        this.state = { activeTab: 0 }
    }

    render() {
        var activeTabComponent = this.state.activeTab === 0 ? <ParentCategoryComponent /> : <SubcategoryComponent />;
        return (
            <div className="">
                <h5 style={{ marginLeft: '15px' }}>Category Management</h5>
                <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                    <Tab href="#parent-category">Parent Categories</Tab>
                    <Tab href="#subcategory">Subcategories</Tab>
                </Tabs>
                <section>
                    <div className="content">
                        {
                            activeTabComponent
                        }
                    </div>
                </section>
            </div>
        );
    }
}

export default CategoryManagementComponent;