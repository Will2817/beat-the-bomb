import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import './SideBar.css'

const ItemGroup = Menu.ItemGroup

class SideBar extends Component {
  handleClick (e) {
    console.log(e.key)
    this.props.addModule(e.key)
  }
  render () {
    const menuItems = this.props.modules.map((module, index) =>
      <Menu.Item key={index}>Module {index}</Menu.Item>
    )

    return (
      <div>
        <div className='side-bar-logo'>B<span className='hidden-logo-text'>eat The Bomb</span></div>
        <Menu
          className='side-bar-menu'
          theme='dark'
          onClick={(e) => this.props.addModule(e.key)}
          mode={this.props.mode}
        >
          <ItemGroup key='sub1' title={<span><Icon type='rocket' /><span className='nav-text'>Active Modules</span></span>}>
            {menuItems}
          </ItemGroup>
          <ItemGroup key='sub2' title={<span><Icon type='file-add' /><span className='nav-text'>All Module</span></span>}>
            <Menu.Item key='password'>Password<Icon type='plus' /></Menu.Item>

          </ItemGroup>
        </Menu>
      </div>
    )
  }
}

export default SideBar
