import React from 'react'
import "./style.scss"


function CloseButton() {
  return (
    <a href="#" className="close-button">
    <div className="in">
      <div className="close-button-block"></div>
      <div className="close-button-block"></div>
    </div>
    <div className="out">
      <div className="close-button-block"></div>
      <div className="close-button-block"></div>
    </div>
  </a>
  )
}

export default CloseButton