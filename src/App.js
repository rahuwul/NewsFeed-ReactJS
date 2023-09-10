import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import { Routes, Route } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  api=process.env.REACT_APP_NEWS_API;
  state={progress:0}
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <>
        <LoadingBar
          color='#52b548'
          height={4}
          progress={this.state.progress}
        />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<News apikey={this.api} setProgress={this.setProgress} key="general" country="in" category="general" pageSize={6} />} />
          <Route exact path="/business" element={<News apikey={this.api} setProgress={this.setProgress} key="business" country="in" category="business" pageSize={6} head="BUSINESS" />} />
          <Route exact path="/entertainment" element={<News apikey={this.api} setProgress={this.setProgress} key="entertainment" country="in" category="entertainment" pageSize={6} head="ENTERTAINMENT" />} />
          <Route exact path="/health" element={<News apikey={this.api} setProgress={this.setProgress} key="health" country="in" category="health" pageSize={6} head="HEALTH" />} />
          <Route exact path="/sports" element={<News apikey={this.api} setProgress={this.setProgress} key="sports" country="in" category="sports" pageSize={6} head="SPORTS" />} />
          <Route exact path="/science" element={<News apikey={this.api} setProgress={this.setProgress} key="science" country="in" category="science" pageSize={6} head="SCIENCE" />} />
          <Route exact path="/technology" element={<News apikey={this.api} setProgress={this.setProgress} key="technology" country="in" category="technology" pageSize={6} head="TECHNOLOGY" />} />
        </Routes>
      </>
    )
  }
}

