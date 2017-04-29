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
      modules: []
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
    var modules = this.state.modules.slice()
    modules.push({type})
    this.setState({modules})
  }
  render () {
    const modules = this.state.modules.map((module, index) => {
      switch (module.type) {
        case 'Password': {
          // TODO might need module to have a unique id
          // not sure what will happen when remove is implemented
          return <div id={index}><PasswordModule key={index} /></div>
        }
        default: return null
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
