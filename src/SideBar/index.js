import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import './SideBar.css'

const ItemGroup = Menu.ItemGroup

class SideBar extends Component {
  handleClick (e) {
    this.props.addModule(e.key)
  }
  render () {
    const menuItems = this.props.modules.map((module, index) => {
      return <Menu.Item key={module.id}><a href={'#' + index}><Icon type='lock' />{module.type}</a></Menu.Item>
    })

    return (
      <div className='side-bar-container'>
        <div className='side-bar-logo'>B<span className='hidden-logo-text'>eat The Bomb</span></div>
        <div className='menu-container'>
          <Menu
            className='side-bar-menu'
            theme='dark'
            onClick={(e) => this.props.addModule(e.key)}
            mode={this.props.mode}
            selectable={false}
          >
            <ItemGroup key='sub2' title={<span><Icon type='file-add' /><span className='nav-text'>All Modules</span></span>}>
              <Menu.Item key='Password'><Icon type='lock' />Password<Icon type='plus' /></Menu.Item>

            </ItemGroup>
          </Menu>
          <Menu
            className='side-bar-menu'
            theme='dark'
            mode={this.props.mode}
            selectable={false}
          >
            <ItemGroup key='sub1' title={<span><Icon type='rocket' /><span className='nav-text'>Active Modules</span></span>}>
              {menuItems}
            </ItemGroup>
          </Menu>

        </div>
      </div>
    )
  }
}

export default SideBar
