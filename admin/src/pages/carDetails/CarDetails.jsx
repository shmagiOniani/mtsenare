import React, {useState, useEffect} from 'react';
import { message, notification, Tabs } from 'antd';
import TechnicalData from './TechnicalData';
import GeneralData from './GeneralData';
import History from './History';
import API from "../../utils/API"

import "./CarDetails.scss"
import useTranslation from '../../components/translation/useTranslation';

const { TabPane } = Tabs;


const  CarDetails = ({id}) => {
  const [fullData, setFullData] = useState([])
  const {trans} = useTranslation();
  const [details, setDetails] = useState([])
  const [historyData, setHistoryData] = useState([])

  const callback = (key) => {
    return key;
  }

  const getHistory = () => {
    API.get(`/get-requests-handler` ,{params:{url: `/VehicleApplication/${id}/history`}})
    .then((res) => {
      setHistoryData(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
      notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
    });
  }
  
  const getFullData = () => {
    API.get(`/get-requests-handler`, {params:{url: `/VehicleApplication/${id}`}})
    .then((res) => {
      setFullData(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
      notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
    });
  }
  
  const getDetails = () => {
    API.get(`/get-requests-handler`, {params:{url: `/VehicleApplication/${id}/details`}})
    .then((res) => {
      setDetails(res.data);
    })
    .catch((err) => {
      console.log(err.response.data);
      notification.error({message: trans(err?.response?.data?.title), placement: "bottomLeft"});
    });
  }

  useEffect(()=> {
    getHistory();
    getFullData();
    getDetails();
  },[id])

  return <div className='content-wrapper car-details-wrapper'>
    <h3 className='content-header'>{fullData?.vehicle?.plateNumber?.toUpperCase()} / {id}</h3>
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="მონაცემები" key="1">
        <GeneralData data={fullData} />
      </TabPane>
      <TabPane tab="ტექნიკური მონაცემები" key="2">
        <TechnicalData data={fullData} details={details} selectedId = {id} />
      </TabPane>
      <TabPane tab="ისტორია" key="3">
        <History data={historyData}  />
      </TabPane>
    </Tabs>
  </div>;
}

export default CarDetails;
