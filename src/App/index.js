import React, { Component } from 'react'
import Cookies from 'universal-cookie'
import { Layout, Button, Row, Col, Card } from 'antd'
import './App.css'
import SideBar from '../SideBar'
import BombInfo from '../BombInfo'
import Modules from '../Modules'

const { Header, Sider, Content } = Layout
const cookies = new Cookies()
const allModules = Modules.reduce((modules, module) => {
  modules[module.heading] = module
  return modules
}, {})

class App extends Component {
  constructor () {
    super()
    var state = {
      collapsed: false,
      mode: 'inline',
      bombInfo: {
        numBatteries: 0,
        numStrikes: 0
      },
      modules: []
    }
    var cookieState = cookies.get('state')
    if (cookieState) {
      cookieState = JSON.parse(new Buffer(cookieState, 'base64').toString('ascii'))
      state.bombInfo = cookieState.bombInfo
      state.modules = cookieState.modules
    }
    this.state = state
  }

  onCollapse (collapsed) {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline'
    })
  }
  updateCookie (bombInfo, modules) {
    var state = {
      bombInfo,
      modules
    }
    cookies.set('state', new Buffer(JSON.stringify(state)).toString('base64'), { path: '/' })
  }
  handleFieldChange (fieldId, value) {
    var bombInfo = {...this.state.bombInfo}
    bombInfo[fieldId] = value
    this.updateCookie(bombInfo, this.state.modules)
    this.setState({bombInfo})
  }
  addModule (type) {
    var modules = this.state.modules.slice()
    var id = (modules.length ? modules[modules.length - 1].id : 0) + 1
    modules.push({id, type, state: {...allModules[type].state}, icon: allModules[type].icon})
    this.updateCookie(this.state.bombInfo, modules)
    this.setState({modules})
  }
  updateModule (index, state) {
    var modules = this.state.modules.slice()
    modules[index] = {...modules[index], state}
    this.updateCookie(this.state.bombInfo, modules)
    this.setState({modules})
  }
  removeModule (index) {
    var modules = this.state.modules.slice()
    modules.splice(index, 1)
    this.updateCookie(this.state.bombInfo, modules)
    this.setState({modules})
  }
  resetModule (index) {
    var modules = this.state.modules.slice()
    var state = {...allModules[modules[index].type].state}
    modules[index] = {...modules[index], state}
    this.updateCookie(this.state.bombInfo, modules)
    this.setState({modules})
  }
  render () {
    const modulesContents = this.state.modules.map((module, index) => {
      const m = allModules[module.type]
      return (
        <Card id={index} key={module.id} title={m.heading} className='module-wrapper'
          extra={<div>
            <Button type='primary' icon='reload' onClick={() => this.resetModule(index)} />
            <Button type='danger' icon='delete' onClick={() => this.removeModule(index)} />
          </div>}>
          <m.element bombInfo={this.state.bombInfo} state={module.state} onStateChange={(state) => this.updateModule(index, state)} />
        </Card>)
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
              <Col xs={24} lg={12}>
                <Layout className='main-content'>
                  {modulesContents}
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
