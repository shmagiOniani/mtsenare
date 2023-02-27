import React, { useState, useEffect } from "react";
import { Button, Input, Select, Row, Col } from "antd";
import { RedoOutlined } from "@ant-design/icons"
import useTranslation from '../../components/translation/useTranslation';

const { Option } = Select;

function FilialFilter({ data, setData, reset }) {
  const { trans } = useTranslation();
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [priority, setPriority] = useState("");



  const filterMethod = () => {
    const filterByName = data.filter((item) => item.name.includes(name));
    const filterByCity = filterByName.filter((item) => item.city.includes(city));
    const filterByAddress = filterByCity.filter((item) => item.address.includes(address));
    const filterByPriority = filterByAddress.filter((item) => item.priority.includes(priority));
    setData(filterByPriority);
  };

  const resetFilter = () => {
    reset()
    setCity("")
    setName("")
    setAddress("")
    setPriority("")
  }



  useEffect(() => {
    if (city === "" && name === "" && address === "" && priority === "") {
      resetFilter()
    } else {
      filterMethod()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, name, address, priority]);


  return (
    <div className="input-container">
      <div className="title">{trans("filter")}</div>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={5}>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={trans("name")}
          />
        </Col>
        <Col xs={24} lg={5}>
          <Input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={trans("city")}
          />
        </Col>
        <Col xs={24} lg={5}>
          <Input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={trans("address")}
          />
        </Col>
        <Col xs={18} lg={5}>
          <Select
            onChange={(e) => setPriority(e)}
            placeholder={trans("priority")}
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Option value={"პრივილეგირებული"}>პრივილეგირებული</Option>
            <Option value={"სტანდარტული"}>სტანდარტული</Option>
          </Select>
        </Col>
        <Col xs={4} lg={4} className="refresh-button">
          <Button onClick={resetFilter}><RedoOutlined /></Button>
        </Col>
      </Row>
    </div>
  );
}

export default FilialFilter;
