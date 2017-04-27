import React, { Component } from 'react'
import { Layout } from 'antd'
import './App.css'
import SideBar from '../SideBar'
import BombInfo from '../BombInfo'
import PasswordModule from '../PasswordModule'

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
      },
      modules: [{
        type: 'password'
      }]
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
  addModule (type) {
    console.log(`adding type: ${type}`)
    var modules = this.state.modules.slice()
    modules.push({type})
    this.setState({modules})
  }
  render () {
    const modules = this.state.modules.map((module) => {
      switch (module.type) {
        case 'password': {
          return <PasswordModule />
        }
      }
    })

    return (
      <Layout className='root-layout'>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse.bind(this)} >
          <SideBar mode={this.state.mode} modules={this.state.modules} addModule={this.addModule.bind(this)} />
        </Sider>
        <Layout>
          <Header><BombInfo bombInfo={this.state.bombInfo} handleFieldChange={this.handleFieldChange.bind(this)} /></Header>
          <Content>
            <Layout>
              {modules}
            </Layout>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default App
