import React from 'react'
import {Modal } from 'antd';
import useTranslation from '../translation/useTranslation';
import CarDetails from '../../pages/carDetails/CarDetails';

function CarDetailsView({modalIsOpen, handleClose, id}) {
  const { trans } = useTranslation();

  return (
    <Modal
    className="car-details-modal slider-modal"
    cancelButtonProps={{ style: { display: "none" } }}
    okButtonProps={{ style: { display: "none" } }}
    // title={trans("add_hardware")}
    visible={modalIsOpen}
    onCancel={handleClose}
    width={1300}
    >
      {modalIsOpen ? <CarDetails id={id} /> : ""}
      {/* {modalIsOpen ? id : "ara"} */}
      
    </Modal>
  )
}

export default CarDetailsView