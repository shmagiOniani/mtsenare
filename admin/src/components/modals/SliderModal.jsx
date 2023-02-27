import React from 'react'
import { Modal, Carousel} from 'antd';
import { variables } from "../../utils/utils"
import notFoundImg from "../../images/not-found.png"
import useTranslation from '../translation/useTranslation';



function SliderModal({ modalIsOpen, handleClose, photos }) {
  
  const { trans } = useTranslation();
  
  function onChange(a) {
    return a;
  }

  const photosInst = [
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  ]


  return (
 
    <Modal
      className="slider-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      // title={trans("add_hardware")}
      visible={modalIsOpen}
      onCancel={handleClose}
      width={900}
    >
      {photos.length === 0 ? <div className='fail-image'>
    <div className="text">{trans("images_not_found")}</div>
        <div className="img-conatiner">
          <img src={notFoundImg} alt="failed_car_photo"/>
        </div>
      </div>
  :

      <Carousel afterChange={onChange}>
        {photosInst?.map((photo, ind) => {
          return (
            <div key={ind} className='car-img'>
              <img alt="pti-img" width={150} src={photo}/>
            </div>
          )
        })}
      </Carousel>
      }
    </Modal>
  )
}

export default SliderModal