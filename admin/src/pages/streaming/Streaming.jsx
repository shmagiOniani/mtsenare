import React, { useContext, useEffect, useState } from 'react'
import { Card, Pagination, Space, Spin, Row, Col, notification } from 'antd';
import ReactPlayer from 'react-player'
import useTranslation from '../../components/translation/useTranslation';
import {AccessDenied} from "../"
import API from "../../utils/API"
import "./Streaming.scss"
import { UserContext } from '../../components/contexts/UserContext';

const { Meta } = Card

function Streaming() {
  const { trans } = useTranslation();
  const {hasPermissions} = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [filials, setFilials] = useState([])
  const [pageCount, setPageCount] = useState(1)
  const [dataToRender, setDataToRender] = useState([])

  const getFilials = () => {
    if (hasPermissions("Permissions.Branch")) {
      setLoading(true)
      // API.get(`/get-requests-handler`, { params: { url: `/Company/branches`, params: {} } })
      // .then(
      //   (res) => {
      //     const filter = res.data.filter(item => item.streamingUrls?.length > 0)
      //     setFilials(filter)
      //     paginationLogic(filter)
      //     setLoading(false)
      //   }
      // )
      // .catch((err) => {
      //   setLoading(false);
      //   notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
      // })
    }
  }

  const paginationLogic = (data) => {
    const from = (pageCount - 1) * 6;
    const to = pageCount * 6;
    const newArr = data?.slice(from, to)

    setDataToRender(newArr)
  }

  useEffect(() => {
    getFilials()
  }, [])

  useEffect(() => {
    paginationLogic(filials)
  }, [pageCount])

  return (
    <>
    {true ?
      <div className='content-wrapper streaming-wrapper'>
        <Row className='streaming-container' justify={"center"} gutter={[30, 30]}>
          {dataToRender?.map((filial, index) => {
            return (
              <React.Fragment key={index}>
                {filial?.streamingUrls?.[0] ?

                  <Col xs={24} sm={12} lg={8} className='card-wrapper'>
                    <Card
                      style={{ width: 300 }}
                      cover={
                        <div className='streaming'>
                          <ReactPlayer muted={true} controls={true} url={filial?.streamingUrls?.[0]} width={400} height={230} />
                        </div>
                      }
                    >
                      <Meta
                        title={filial.name}
                        description={
                          <div className='card-body'>
                            <div><p>{trans("identification_num")}:</p><p>{filial.identificationNumber}</p></div>
                            <div><p>{trans("address")}:</p><p>{filial.address}</p></div>
                            <div><p>{trans("phone")}:</p><p>{filial.mobileNumber}</p></div>
                            <div><p>{trans("line_amount")}:</p><p>{filial.workLineCount}</p></div>
                            <div><p>{trans("company_id")}:</p><p>{filial.companyId}</p></div>
                            <div><p>{trans("supports_military")}:</p><p>{filial.supportsMilitary ? trans("yes") : trans("no")}</p></div>
                            <div><p>{trans("supports_foreign")}:</p><p>{filial.supportsForeign ? trans("yes") : trans("no")}</p></div>
                          </div>}
                      />
                    </Card>
                  </Col>
                  : ""}
              </React.Fragment>
            )
          }
          )}
        </Row>
        <div className="pagination">
          <Pagination showSizeChanger={false} onChange={(key) => setPageCount(key)} current={pageCount} pageSize={6} total={filials?.length} />
        </div>
        {loading &&
          <Space size="middle" className='loading'>
            <Spin size="large" />
          </Space>
        }

      </div>
    :
        <AccessDenied/>
    }

    </>

  )
}

export default Streaming