import React, { useEffect } from 'react'
import { Col, Row, Form, Input } from 'antd'
import useTranslation from "../../components/translation/useTranslation";
import Navbar from '../../components/navbar/Navbar'
import Footer from '../footer/Footer';
import "./ContactUs.scss"
import TextArea from 'antd/lib/input/TextArea';
import avatar from "../../assets/img/avatar.png";



function ContactUs() {
  const { trans } = useTranslation();
  const [form] = Form.useForm();

  const onFinish = (data) => {
    console.log(data);
  }

  // history.push('/home');
  // location.pathname

  useEffect(() => {
    console.log("here");
  })

  return (
    <div className='contact-us-wrapper'>

      <Row className='page-container'>
        <Col xs={24}>
          <Navbar />
        </Col>
        <Col xs={24} className={"page-header"}>

        </Col>
        <Col xs={24} className={"form-container"}>
          <Row gutter={[20, 20]}>
            <Col xs={24} sm={12}>
              <div className="contact-welcome-text">
                <div className="avatar-container">
                  <img src={avatar} alt={"avatr"} />
                </div>
                <h1>We take <span>flowers</span> personally, with your thoughts in hand… </h1>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec.</p>

              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className="contact-form-wrapper">
                <h1>Get in Touch!</h1>
                <p>Class aptent taciti sociosqu ad litora torquent per conubia nostr. Mauris in erat justullam ac urna eu felis dapib</p>
                <Form
                  layout={"horizontal"}
                  form={form}
                  initialValues={{
                    layout: "horizontal",
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item name={"fullName"}>
                    <Input placeholder="Your Ful Name ..." />
                  </Form.Item>
                  <Form.Item name={"email"}>
                    <Input placeholder={`${trans("email")}`} />
                  </Form.Item>
                  <Form.Item name={"phone"}>
                    <Input placeholder="Phone ..." />
                  </Form.Item>
                  <Form.Item name={"phone"}>
                    <TextArea rows={5} placeholder="Phone ..." />
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Footer />
        </Col>
      </Row>
    </div>
  )
}

export default ContactUs