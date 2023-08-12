import React, { Component } from 'react'
import loading from './loading.gif'


export class Spinner extends Component {
  render() {
    return (
      <div >
        <img src={loading} alt="loading" className="img-blend rounded mx-auto d-block" style={{ width: '100px', height: '100px', border: 'none' }}></img>
      </div>
    )
  }
}

export default Spinner
