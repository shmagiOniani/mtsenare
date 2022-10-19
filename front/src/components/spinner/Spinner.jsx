import React from 'react'
import Lottie from 'lottie-react-web'
import spinner from "../../assets/img/spinner.json";
import "./style.scss"


function Spinner() {
  return (
    <div className='spinner-wrapper'>
      <Lottie
        options={{
          animationData: spinner,
          autoplay: true,
          loop: true
        }}
      />
    </div>
  )
}

export default Spinner