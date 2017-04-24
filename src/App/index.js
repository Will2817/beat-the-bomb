import React, { Component } from 'react'
import { Layout } from 'antd'
import './App.css'
import SiderBar from '../SideBar'
// import BombInfo from './BombInfo'

const { Header, Sider, Content } = Layout

class App extends Component {
  render () {
    return (
      <Layout className='root-layout'>
        <Header>Header</Header>
        <Layout>
          <Sider><SiderBar /></Sider>
          <Content>Content</Content>
        </Layout>
      </Layout>
    )
  }
}

export default App
