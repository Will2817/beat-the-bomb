import React, { Component } from 'react'
import { Layout, Header, Sider, Content } from 'antd'
import SideBar from '../SideBar'
import './App.css'

class App extends Component {
  render () {
    return (
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider><SideBar /></Sider>
          <Content>Content</Content>
        </Layout>
      </Layout>
    )
  }
}

export default App
