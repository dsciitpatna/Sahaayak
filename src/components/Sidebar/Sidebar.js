import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './Sidebar.css'
import { Layout, Menu, Icon } from "antd";

import { getAllCategories } from "../../redux/actions/categoryActions";

const { Sider } = Layout;

class SideBar extends Component {
  state = {
    categories: null
  }

  componentDidMount() {
    this.props.getAllCategories();
    this.setState({
      categories: this.props.categories
    })
  }

  render() {

      const categoryList=this.state.categories ? ( this.state.categories.map((category)=>{
        return(
          <Menu.Item key={category._id}>
            <Icon type="form" />
            <span><Link to="/categoryWiseServices" style={{ color: 'white' }} >{category.name}</Link></span>
          </Menu.Item>
        )
      })
      ) : (
        <div>Loading...</div>
      )

    return (
      <div className="wrapper">
      <Fragment style={{position: 'relative'}}>
        <Sider
          style={{ overflow: 'auto', height: '100vh', left: 0 }}
          trigger={null}
          collapsible
          collapsedWidth={0}
          collapsed={this.props.collapseProp}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline">
            { categoryList }
          </Menu>
        </Sider>
      </Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  categories: state.category.categories
});

export default connect(
  mapStateToProps,
  { getAllCategories }
)(SideBar);