import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Col, Row,Select } from 'antd'
import { GlobalOutlined, UnorderedListOutlined } from "@ant-design/icons";
import Navbar from '../../components/navbar/Navbar'
import MapInst from '../../components/mapInst/MapInst'
import Footer from '../footer/Footer';
import avatar from "../../assets/img/avatar.png";

import "./ShopList.scss"

const shops = [
  {
    avatar: avatar,
    name: "some name",
    description: "Lorem ipsum dolor sit amet "
  },
  {
    avatar: avatar,
    name: "some name",
    description: "Lorem ipsum dolor sit amet "
  },
  {
    avatar: avatar,
    name: "some name",
    description: "Lorem ipsum dolor sit amet "
  },
  {
    avatar: avatar,
    name: "some name",
    description: "Lorem ipsum dolor sit amet "
  },
  {
    avatar: avatar,
    name: "some name",
    description: "Lorem ipsum dolor sit amet "
  },
  {
    avatar: avatar,
    name: "some name",
    description: "Lorem ipsum dolor sit amet "
  },
  {
    avatar: avatar,
    name: "some name",
    description: "Lorem ipsum dolor sit amet "
  },
  {
    avatar: avatar,
    name: "some name",
    description: "Lorem ipsum dolor sit amet "
  },
  {
    avatar: avatar,
    name: "some name",
    description: "Lorem ipsum dolor sit amet "
  },
  {
    avatar: avatar,
    name: "some name",
    description: "Lorem ipsum dolor sit amet "
  },
  {
    avatar: avatar,
    name: "some name",
    description: "Lorem ipsum dolor sit amet "
  },
  {
    avatar: avatar,
    name: "some name",
    description: "Lorem ipsum dolor sit amet "
  },
  {
    avatar: avatar,
    name: "some name",
    description: "Lorem ipsum dolor sit amet "
  },
  {
    avatar: avatar,
    name: "some name",
    description: "Lorem ipsum dolor sit amet "
  },
  {
    avatar: avatar,
    name: "some name",
    description: "Lorem ipsum dolor sit amet "
  },
  {
    avatar: avatar,
    name: "some name",
    description: "Lorem ipsum dolor sit amet "
  },
  {
    avatar: avatar,
    name: "some name",
    description: "Lorem ipsum dolor sit amet "
  },
  {
    avatar: avatar,
    name: "some name",
    description: "Lorem ipsum dolor sit amet "
  },
]

function ShopList() {
  const { Option } = Select;
  const [listStyle, setListStyle] = useState("map")
  
  let history = useHistory();


  const handleShopClick = (id) => {
    history.push(`/shop/${id}`);
  }

  return (
    <div className='page-wrapper'>

      <Row className='page-container'>
        <Col xs={24}>
          <Navbar />
        </Col>
        <Col xs={24} className={"page-header"}>
          <h1>მაღაზიების სია</h1>
          <p></p>
        </Col>
        <Col xs={24}>
          <Row gutter={[30, 30]} className='map-section'>
            <Col xs={24} >
              <div className="list-style">
                <div className="buttons">

                <Button className={listStyle === "map" ? "active-btn" : ""} onClick={() => setListStyle("map")} icon={<GlobalOutlined />} >რუკა</Button>
                <Button className={listStyle === "list" ? "active-btn" : ""} onClick={() => setListStyle("list")} icon={<UnorderedListOutlined />}>სია</Button>
                </div>
                <div className="input-wrapper">
                <Select
                  placeholder={"მაღაზიის ტიპი"}
                // dropdownClassName="new-user-select"
                >
                  <Option value={"1"}>
                    {"ყვავისლების მაღაზია"}
                  </Option>
                  <Option value={"2"}>
                    {"ქოთნის მცენარეები"}
                  </Option>
                </Select>
              </div>  
              </div>
              {listStyle === "map"
                ? <MapInst />
                : <Row gutter={[30, 10]} className="list-container">
                  {shops.map((item, ind) => (
                    <Col 
                      xs={24} 
                      lg={12} 
                      xl={8}  
                      className="list-item"
                      onClick={()=> handleShopClick(ind)}>
                      <div className='item-wrapper'>

                        <div style={{display: "flex", justifyContent:"space-between"}} gutter={[10, 10]} justify={"start"} align={"middle"}>
                          <div xs="4">
                            <div className="img-container">
                              <img src={item.avatar} alt="bla" />
                            </div>
                          </div>
                          <div xs="20" className='text-wrapper'>
                            <div>{item.name}</div>
                            <div>{item.description}</div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))
                  }
                </Row>
              }
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

export default ShopList