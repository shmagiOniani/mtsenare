import React, {useEffect, useContext, useState} from 'react'
import { Col, Modal, Row , Button, message, notification } from 'antd'
import { UserContext } from '../contexts/UserContext';
import useTranslation from '../translation/useTranslation';
import API from "../../utils/API"



function InvoiceForm({ isOpen, handleClose, organizationName, cars }) {
  const { trans } = useTranslation();
  const context = useContext(UserContext);

  let today = new Date();   
  let currentDate = `${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`;

  const [branch, setBranch] = useState({})
  const [totalPrice, setTotalPrice] = useState(0)


  const getBranch = (id) => {
    if(context.hasPermissions("Permissions.Branch")){

      API.get(`/get-requests-handler`, { params: { url: `/Company/branches/${id}`, params: {} } })
        .then(
          (res) => {
            if(res.data.name === "Error"){
              message.error(res.data.message);
            }else {
            setBranch(res.data)}})
        .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
    }
  }

  const handleFinish = () => {
    const prices = cars?.map((car) =>  {return({id: car.id, vehicleCount: 10, price: car.price,  totalPrice: 10}) })

    const dataInstance = {
      applicantName: organizationName,
      identificationCode: "string",
      contactPhone: "string",
      contactEmail: "",
      applicantAddress: "",
      prescription: "",
      totalPaymentPrice: 0,
      totalPrice: 0,
      prices
    }

    API.post(`/post-requests-handler`, { url: `/Invoice`, params: {}, data:dataInstance })
    .then(res => {
      if(res.data.name === "Error") {
        message.error(res.data.message);
      }else {
        handleClose()
      }
    })
    .catch(err => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
  }



  useEffect(()=> {
    if(isOpen) {
      let countInstance = 0;
      cars?.map((car) => countInstance += parseInt(car.price))
      setTotalPrice(countInstance)
      getBranch(context.user.branchId)
    }else {
    }
  }, [isOpen])

  return (
    <>
      <Modal
        className="registration-modal filial-registration-modal"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        title={trans("invoice_order")}
        visible={isOpen}
        onCancel={() => handleClose(false)}
        width={1200}>
        <div className='invoice-form-wrapper'>
          <Row gutter={[16, 16]}>
            <Col xs={12}>
              <div className="bordered col-wrapper form-header">
                <div className="img-container"></div>
                <div> მიღება - ჩაბარების აქტი</div>
              </div>
            </Col>
            <Col xs={12}>
              <div className="bordered col-wrapper">
                <div className="item-header">აქტის დეტალები</div>
                <div className="invoice-table-wrapper">

                  <table>
                    <thead>
                      <tr><th className='b-0'></th></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='bl-0'>აქტის ნომერი:</td>
                        <td className='br-0'>12</td>
                      </tr>
                      <tr>
                        <td className='bl-0'>თარიღი</td>
                        <td className='br-0'>{currentDate}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
            <Col xs={12}>
              <div className="bordered col-wrapper">
                <div className="item-header">მომწოდებელი</div>
                <div className="invoice-table-wrapper">

                  <table>
                    <thead>
                      <tr><th colSpan={2} className='b-0'>{branch?.name}</th></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='bl-0'>საიდენტიფიკაციო კოდი</td>
                        <td className='br-0'>{branch?.identificationNumber}</td>
                      </tr>
                      <tr>
                        <td className='bl-0'>წარმომადგენელი</td>
                        <td className='br-0'>თეიმურაზ საღირაშვილი</td>
                      </tr>
                      <tr>
                        <td className='bl-0'>საბანკო ანგარიშის ნომერი</td>
                        <td className='br-0'>-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
            <Col xs={12}>
              <div className="bordered col-wrapper">
                <div className="item-header">{"ორგანიზაციის დასახელება"}</div>
                <div className="invoice-table-wrapper">

                  <table>
                    <thead>
                      <tr><th colSpan={2} className='b-0'>{organizationName ? organizationName : "ორგანიზაციის დასახელება"}</th></tr>
                      
                    </thead>
                    <tbody>
                      <tr>
                        <td className='bl-0'>საიდენტიფიკაციო კოდი</td>
                        <td className='br-0'>203860642</td>
                      </tr>
                      <tr>
                        <td className='bl-0'>წარმომადგენელი</td>
                        <td className='br-0'></td>
                      </tr>
                      <tr>
                        <td className='bl-0'>საბანკო ანგარიშის ნომერი</td>
                        <td className='br-0'></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
            <Col xs={24}>
              <div className="bordered col-wrapper">
                <div className="item-header">შეთანხმება</div>
                <div className="item-state">
                  სახით და მეორეს მხრივ შპს "ჭაპანი 120" ს/ნ 206065684 (მომწოდებელი) მისი დირექტორის ალექსანდრე სვანიძე-ს სახით, ვადგენთ
                  წინამდებარე აქტს მასზედ, რომ "მომწოდებელი" მიაწოდა და "შემსყიდველმა" მიიღო შემდეგი მომსახურება: გზისთვის ვარგისობაზე
                  ინსპექტირების ჩატარება
                </div>
                <div className="invoice-table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th className='bl-0 br-0'>#</th>
                        <th className='bl-0 br-0'>გზისთვის ვარგისობაზე ინსპექტირება</th>
                        <th className='bl-0 br-0'>გაწეული მომსახურება</th>
                        <th className='bl-0 br-0'>საფასური</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cars?.map((car, index) => {
                        return(
                          <tr key={index} className={"car-list"}>
                            <td className='bl-0'>{index+1}</td>
                            <td className='br-0 category' ><span>სახ ნომერი: {car.plateNumber} </span><span>კატეგორია: {car.category ? car.category : "-"}</span></td>
                            <td className='br-0'>1. პერიოდული ტექნიკური ინსპექტირება</td>
                            <td className='br-0'>{car.price}</td>
                          </tr>
                        )
                      })}
                      {/* <tr>
                        <td className='bl-0'>1</td>
                        <td className='br-0'><span>სახ ნომერი: QQ155QR </span><span>კატეგორია: m1</span></td>
                        <td className='br-0'>1. პერიოდული ტექნიკური ინსპექტირება</td>
                        <td className='br-0'>60</td>
                      </tr> */}
                      <tr>
                        <td className='b-0'></td>
                        <td className='b-0'></td>
                        <td className='b-0 pricing'>
                          <span>სრული საფასური: {totalPrice} ლარი</span>
                          {/* <span>საფასური სიტყვიერად: სამოცი ლარი და ნული თეთრი</span> */}
                        </td>
                        <td className='b-0'></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
            <Col xs={24}>
              <div className="bottom-line col-wrapper">
                <div>
                  <span>შპს ჭაპანი 120</span>
                  <span>წარმომადგენელი</span>
                </div>
                <div><span>თეიმურაზ საღირაშვილი</span></div>
              </div>
            </Col>
            <Col xs={24}>
              <div className="bottom-line col-wrapper">
                <div>
                  <span>სსიპ საერთო სასამართლოების დეპ.</span>
                  <span>წარმომადგენელი</span>
                </div>
                <div className='sign-line'></div>
              </div>
            </Col>
            <Col>
              <div></div>
              <Button onClick={()=> handleFinish()} type={"primary"}>{trans("print")}</Button>
            </Col>
          </Row>
        </div>
        {/* {visible ? (
          <Alert message="Alert Message Text" type="success" closable afterClose={handleAlert} />
        ) : null} */}
      </Modal>
    </>
  )
}

export default InvoiceForm