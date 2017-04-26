import React, { Component } from 'react'
import { Layout } from 'antd'
import './App.css'
import SideBar from '../SideBar'
import BombInfo from '../BombInfo'

const { Header, Sider, Content } = Layout

class App extends Component {
  constructor () {
    super()
    this.state = {
      collapsed: false,
      mode: 'inline',
      bombInfo: {
        numBatteries: 0,
        numStrikes: 0
      }
    }
  }
  onCollapse (collapsed) {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline'
    })
  }
  handleFieldChange (fieldId, value) {
    var bombInfo = {...this.state.bombInfo}
    bombInfo[fieldId] = value
    this.setState({bombInfo})
  }
  render () {
    return (
      <Layout className='root-layout'>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={(collapsed) => this.onCollapse(collapsed)} >
          <SideBar mode={this.state.mode} />
        </Sider>
        <Layout>
          <Header><BombInfo bombInfo={this.state.bombInfo} handleFieldChange={this.handleFieldChange.bind(this)} /></Header>
          <Content>Number of batteries: {this.state.bombInfo.numBatteries}</Content>
        </Layout>
      </Layout>
    )
  }
}

export default App
