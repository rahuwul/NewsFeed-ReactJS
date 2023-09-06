import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import {Routes, Route} from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
   <>
   <Navbar/>
   <Routes>
   <Route  exact path="/" element={<News key="general" country="in" category="general"pageSize={6}/>}/>
   <Route  exact path="/business" element={<News key="business" country="in" category="business"pageSize={6} head="BUSINESS"/>}/>
   <Route  exact path="/entertainment" element={<News key="entertainment" country="in" category="entertainment"pageSize={6} head="ENTERTAINMENT"/>}/>
   <Route  exact path="/health" element={<News key="health" country="in" category="health"pageSize={6} head="HEALTH"/>}/>
   <Route  exact path="/sports" element={<News key="sports" country="in" category="sports"pageSize={6}head="SPORTS"/>}/>
   <Route  exact path="/science" element={<News key="science" country="in" category="science"pageSize={6}head="SCIENCE"/>}/>
   <Route  exact path="/technology" element={<News key="technology" country="in" category="technology"pageSize={6}head="TECHNOLOGY"/>}/>
   </Routes>
   </>
    )
  }
}

