import React, { useEffect, useState } from 'react';
import { Row, Col, Image, Button, Upload, message, notification, Space, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

import API from "../../utils/API";
import useTranslation from '../../components/translation/useTranslation';

let inst = ["წინა ხედი"," უკანა ხედი"," ფოტო ქვემოდან "," შიდა ფოტო"];


function CarPhoto() {
  const { trans } = useTranslation();
  const { id } = useParams();
  const [fileList, setFileList] = useState([])
  const [photos, setPhotos] = useState([])
  const [ photoCount, setPhotoCount,] = useState({})
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})

  const handleVehicleApi = () => {
    setPhotos([])

    setLoading(true)
    API.get(`/get-requests-handler`, { params: { url: `/VehicleApplication/${id}` } })
      .then((res) => {
        setData(res.data)
        setPhotos(res.data.photos)
        let rejectedInst = res.data.rejectedDetails.map(i => i.rejectedDetailId)
        console.log("handleVehicleApi",rejectedInst);
        if([68, 67].some(value => {return rejectedInst.includes(value)})){
          getCategories(res.data, true)
        }else {
          getCategories(res.data, false)
        }
        setLoading(false)

      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      })
  };

  const deletePhoto = (item) => {
    API.delete(`/delete-requests-handler`, { params: { url: `/VehicleApplication/${id}/photos/${item.order}`, params: { id: item.id, order: item.order } } })
      .then((res) => {
        message.success(res.data);
        handleVehicleApi();
      })
      .catch(err => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      })
  }


  const normFile = (element, orderInd) => {
    var formData = new FormData();
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    formData.append("Photo", element.file);
    formData.append("url", `VehicleApplication/${id}/photos/${orderInd}`);

    var request = new XMLHttpRequest();

    request.open("POST", `url`);
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        setFileList(element.fileList)
        // setOrder(prev => prev + 1)
        handleVehicleApi()
      }
    }
    request.setRequestHeader("token", token);
    request.setRequestHeader("user", user);
    request.setRequestHeader("contentType", 'multipart/form-data');
    request.send(formData)
  };

  const getCategories = (mainData, hasReject) => {
    setLoading(true)
    API.get(`/get-requests-handler`, { params: { url: `/Common/categories` } })
      .then((res) => {
        
        let countInst = res?.data?.find(i => i.id === mainData?.vehicle?.category)?.photoCount;
        if(hasReject) {
          if(countInst < 3){
            setPhotoCount(3)
          }else {
            setPhotoCount(countInst)
          }
        }else {
          setPhotoCount(countInst)
        }
        setLoading(false)
      })
      .catch((err) => {
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      });
  }

  useEffect(() => {
    handleVehicleApi()
    // setPhotos(data?.photos)
  }, [])

  const photoArr = [
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  ]



  return <div className='car-photos'>
    <Row className="images" justify={"start"}>

      {[...Array(photoCount)]?.map((b,index) => {
        return (
          <Col className="photo-item" key={index}>
            {
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={(e) => normFile(e, index + 1)}
                beforeUpload={() => false}
              >
                <div className="img-cover">
                  <div className="overlay">
                    {inst[index] || ""}
                  </div>
                </div>
              </Upload>
            }
          </Col>
        )

      })}
      {loading &&
          <Space size="middle" className='loading'>
            <Spin size="large" />
          </Space>
        }
    </Row>
  </div>;
}

export default CarPhoto;
