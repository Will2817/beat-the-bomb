import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import './SideBar.css'

const ItemGroup = Menu.ItemGroup

class SideBar extends Component {
  handleClick (e) {

  }
  render () {

    return (
      <div>
        <div className='side-bar-logo'>B<span className='hidden-logo-text'>eat The Bomb</span></div>
        <Menu
          className='side-bar-menu'
          theme='dark'
          onClick={this.handleClick}
          mode={this.props.mode}
        >
          <ItemGroup key='sub1' title={<span><Icon type='rocket' /><span className='nav-text'>Active Modules</span></span>}>
            <Menu.Item key='1'>Option 1</Menu.Item>
            <Menu.Item key='2'>Option 2</Menu.Item>
          </ItemGroup>
          <ItemGroup key='sub2' title={<span><Icon type='file-add' /><span className='nav-text'>All Module</span></span>}>
            <Menu.Item key='5' onclick={this.props} >Option 5<Icon type='plus' /></Menu.Item>
            <Menu.Item key='6'>Option 6<Icon type='plus' /></Menu.Item>
          </ItemGroup>
        </Menu>
      </div>
    )
  }
}

export default SideBar
