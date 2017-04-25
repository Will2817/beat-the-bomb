import React, { Component } from 'react'
import { Layout } from 'antd'
import './App.css'
import SideBar from '../SideBar'
// import BombInfo from './BombInfo'

const { Header, Sider, Content } = Layout

class App extends Component {
  constructor () {
    super()
    this.state = {
      collapsed: false,
      mode: 'inline'
    }
  }
  onCollapse (collapsed) {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline'
    })
  }
  render () {
    return (
      <Layout className='root-layout'>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={(collapsed) => this.onCollapse(collapsed)} >
          <SideBar mode={this.state.mode} />
        </Sider>
        <Layout>
          <Header>Bomb Info Page</Header>
          <Content>Content</Content>
        </Layout>
      </Layout>
    )
  }
}

export default App
