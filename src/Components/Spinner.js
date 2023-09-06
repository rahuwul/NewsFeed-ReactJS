import React, { Component } from 'react'
import loading from './loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='container text-center' style={{width:"500px",height:"500px"}}>
        <img style={{margin:"150px"}} src={loading} alt='Loading...'></img>
      </div>
    )
  }
}
