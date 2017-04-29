import React, { Component } from 'react'
import { Layout, Button, Row, Col } from 'antd'
import './App.css'
import SideBar from '../SideBar'
import BombInfo from '../BombInfo'
import PasswordModule from '../PasswordModule'
import uuid from 'uuid/v1'

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
    modules.push({id: uuid(), type})
    this.setState({modules})
  }
  removeModule (index) {
    var modules = this.state.modules.slice()
    modules.splice(index, 1)
    this.setState({modules})
  }
  render () {
    const modules = this.state.modules.map((module, index) => {
      switch (module.type) {
        case 'Password': {
          return (<div id={index} key={module.id}>
            <div style={{'display': 'flex', 'flex-direction': 'row'}}>
              <h2 style={{'display': 'flex', 'flex': '1'}}>Password</h2><Button type='danger' icon='delete' onClick={() => this.removeModule(index)} />
            </div>
            <PasswordModule />
          </div>)
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
            <Row>
              <Col span={12}>
                <Layout>
                  {modules}
                </Layout>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default App
