import React, { useContext, useEffect, useState } from "react";
import useTranslation from "../../components/translation/useTranslation";
import { Row, Col, Modal, Image, Button, message, notification } from "antd";
import { RedoOutlined, UploadOutlined, CheckOutlined } from "@ant-design/icons";
import checkmark from "../../images/checkmark.png";
import cancellmark from "../../images/cancellmark.png";
import API from "../../utils/API";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

function CarDetailsModal({
  modalIsOpen,
  setModalIsOpen,
  children,
  data,
  dataState,
  id,
  refresh
}) {
  const { trans } = useTranslation();
  const { hasPermissions } = useContext(UserContext)
  let history = useHistory();

  const [finishBtnLoad, setFinishBtnLoad] = useState(false)
  const [uploadBtnLoad, setUploadBtnLoad] = useState(false)
  const [returnBtnLoad, setReturnBtnLoad] = useState(false)
  // const [photos, setPhotos] = useState([])
  const [innerModalVar, setInnerModalVar] = useState(false)
  const [fullData, setFullData] = useState({})
  const photos = [
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  ]

  const handleRevertBtn = ()=> {
    setReturnBtnLoad(true)
    API.post(`/post-requests-handler`, { url: `/VehicleApplication/${id}/revertDone`, params: {}, data: {} })
      .then(res => {
        setReturnBtnLoad(false);
        getData()
        refresh()
      })
      .catch((err) => {
        setReturnBtnLoad(false);
        notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
      })
  }

  const handleFinishBtn = () => {

    setFinishBtnLoad(true)
    API.put(`/put-requests-handler`, { url: `/VehicleApplication/${id}`, data: data() })
      .then((res) => {
        API.post(`/post-requests-handler`, { url: `/VehicleApplication/${id}/done`, params: {}, data: {} })
          .then(res => {
            setFinishBtnLoad(false)
            getData()
            refresh()
          })
          .catch((err) => {
            setFinishBtnLoad(false)
            notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
          })
      })
      .catch((err) => {
        setFinishBtnLoad(false)
      })
  }

  const handleUploadBtn = () => {
    setUploadBtnLoad(true)

    API.put(`/put-requests-handler`, { url: `/VehicleApplication/${id}`, data: data() })
      .then((res) => {
        API.post(`/post-requests-handler`, { url: `/VehicleApplication/${id}/upload`, params: {}, data: {} })
          .then(res => {
            setUploadBtnLoad(false)
            message.success("success");
            getData()

            history.push(`/shops`)
          })
          .catch((err) => {
            setUploadBtnLoad(false)
            notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
          })
      })
      .catch((err) => {
        setUploadBtnLoad(false)
      })
  }

  const handleClose = () => {
    setModalIsOpen(false);
    setInnerModalVar(false);
  };

  const getData = () => {
    API.get(`/get-requests-handler`, { params: { url: `/VehicleApplication/${id}` } })
      .then((res) => {
        // setPhotos(res.data.photos);
        setInnerModalVar(true);
        setFullData(res.data)
      })
      .catch((err) => notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" }))
  }
  useEffect(() => {
    if (data) {
      setFullData(data)
    }
    if (modalIsOpen) {
      getData();
      return () => {
        setFullData({});
        // setPhotos([])
      };
    }
  }, [modalIsOpen])

  return (
    <Modal
      className="car-details-modal"
      cancelButtonProps={{ style: { display: "none" } }}
      cancelText={trans("cancel")}
      okButtonProps={{ style: { display: "none" } }}
      title={"შედეგები"}
      visible={innerModalVar}
      onCancel={handleClose}
    >
      <Row>
        <div className="brakes-table ant-table">
          <div>
            <Row className="table-head">
              <Col span={24}> {"მუხრუჭის ტესტი"}</Col>
            </Row>
          </div>
          {fullData.brakeResult ? <table style={{ width: "100%" }} className={"table-body"}>
            <thead>
              <tr>
                <th>ღერძი</th>
                <th colSpan={6}>მიღებული შედეგები </th>
              </tr>
            </thead>
            <tbody>

              <tr>
                <td></td>
                <td>{trans("right")}</td>
                <td>{trans("left")}</td>
                <td>{trans("effective")}</td>
                <td>{trans("difference")}</td>
                <td>{trans("weight")}</td>
                <td>{trans("result")}</td>
              </tr>
              {fullData.brakeResult?.brakes?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="left ">
                      {item.type === 2
                        ? trans("parking_brake")
                        : `${trans("axis")} ${index + 1}`}
                    </td>
                    {<td>{item.rightAxlePower}kN</td>}
                    {<td>{item.leftAxlePower}kN</td>}
                    <td>{item.axleEfficiency}%</td>
                    <td>
                      {item.type === 1 && `${item.differenceBetweenLegs} %`}
                    </td>
                    <td>{item.leftAxleWeight + item.rightAxleWeight}{trans("kg")}</td>
                    <td className="center">
                      {item.type === 2 ? (
                        item.axleEfficiency >
                          fullData.parkingBrakesEfficiencyLimit ? (
                          <div className="succes-icon">
                            <Image src={checkmark} />
                          </div>
                        ) : (
                          <div className="succes-icon">
                            <Image src={cancellmark} />
                          </div>
                        )
                      ) : item.axleEfficiency >
                        fullData.serviceBrakesEfficiencyLimit ? (
                        item?.differenceBetweenLegs <
                          fullData.differenceBetweenLegsLimit ? (
                          <div className="succes-icon">
                            <Image src={checkmark} />
                          </div>
                        ) : (
                          <div className="succes-icon">
                            <Image src={cancellmark} />
                          </div>
                        )
                      ) : (
                        <div className="succes-icon">
                          <Image src={cancellmark} />
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td className="left">{trans("overall_efficiency")}</td>
                <td className="txt-center" colSpan={5}>
                  {fullData.brakeResult?.serviceBrakesEfficiency}% ({trans("norm")}:{" "}
                  {fullData.serviceBrakesEfficiencyLimit}%)
                </td>
                <td className="center">
                  {fullData.brakeResult?.serviceBrakesEfficiency >
                    fullData.serviceBrakesEfficiencyLimit ? (
                    <div className="succes-icon">
                      <Image src={checkmark} />
                    </div>
                  ) : (
                    <div className="succes-icon">
                      <Image src={cancellmark} />
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td className="left">{trans("overall_efficiency")} ({trans("parking_brake")})</td>
                <td className="txt-center" colSpan={5}>
                  {fullData.brakeResult?.parkingBrakesEfficiency}% ({trans("norm")}:{" "}
                  {fullData.parkingBrakesEfficiencyLimit}%)
                </td>
                <td className="center">
                  {fullData.brakeResult?.parkingBrakesEfficiency >
                    fullData.parkingBrakesEfficiencyLimit ? (
                    <div className="succes-icon">
                      <Image src={checkmark} />
                    </div>
                  ) : (
                    <div className="succes-icon">
                      <Image src={cancellmark} />
                    </div>
                  )}
                </td>
              </tr>
            </tbody>

          </table> : <div className="data-not-found"> {trans("data_not_found")}</div>}
        </div>
        <div className="co-test-table ant-table">
          <div>
            <Row className="table-head">
              <Col span={24}> {trans("exhaust_test")}</Col>
            </Row>
            <div className="table-body">
              {fullData.exhaustResult?.type === 2 || fullData.exhaustResult?.type === 7 ? (
                <Row>
                  <Col span={18} className="co-result diesel-left">
                    <Row>
                      <Col span={24}>{trans("measurement_results")}</Col>
                    </Row>
                    <Row>
                      <Col span={5}>I - RPM / M</Col>
                      <Col span={5}>II - RPM / M</Col>
                      <Col span={5}>III - RPM / M</Col>
                      <Col span={5}>IV - RPM / M</Col>
                      <Col span={4}>{trans("est_avr")}</Col>
                    </Row>
                    <Row>
                      {fullData.exhaustResult?.exhausts?.map((exhaust, index) => {
                        return (
                          <Col key={index} className="center" span={5}>
                            {exhaust.speed} - {exhaust.co}
                          </Col>
                        );
                      })}

                      {fullData.exhaustResult?.exhausts.length < 4 ? (
                        <Col className="center" span={5}>
                          NULL - 0
                        </Col>
                      ) : (
                        ""
                      )}
                      <Col span={4}>{trans("est_avr")}</Col>
                    </Row>
                  </Col>
                  <Col span={4}>
                    <Row>
                      <Col className="co-result-header" span={24}>
                        {trans("established_norm")}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="co-result-value" span={24}>
                        {trans("max")} : {fullData?.exhaustLimits?.highSpeedCoLevel}
                      </Col>
                    </Row>
                  </Col>
                  <Col span={2}>
                    <Row>
                      <Col className="co-result-header" span={24}>
                        {trans("result")}
                        {/* sashvalo monacemi ar agematebodes 2.5 */}
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24} className="co-result-icon">
                        {fullData?.exhaustResult?.highSpeedCo <=  fullData?.exhaustLimits?.highSpeedCoLevel? (
                          <div className="succes-icon">
                            <Image src={checkmark} />
                          </div>
                        ) : (
                          <div className="succes-icon">
                            <Image src={cancellmark} />
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ) : fullData.exhaustResult?.type === 1 || fullData.exhaustResult?.type === 5 ? (
                <Row>
                  <Col span={10} className="co-result petrol-left">
                    <Row>
                      <Col span={24}>{trans("measurement_results")}</Col>
                    </Row>
                    <Row>
                      <Col span={10}>{trans("loafer_the_move")} / CO</Col>
                      <Col span={10}>{trans("with_high_torque")} / CO</Col>
                      <Col span={4}>{trans("lambda")}</Col>
                    </Row>
                    <Row>
                      {fullData.exhaustResult?.exhausts?.map((exhaust, index) => {
                        return (
                          <Col key={index} className="center" span={10}>
                            {exhaust.speed} - {exhaust.co}
                          </Col>
                        );
                      })}
                      <Col className="center" span={4}>
                        {fullData.exhaustResult?.lambda}
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row>
                      <Col className="co-result-header" span={24}>
                        {trans("established_norm")}
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        className="co-result-value"
                        span={24}
                      >{`${trans("not_loaded")} CO - ${fullData.exhaustLimits?.normalSpeedCoLevel} - ${trans("loaded")} CO - ${fullData.exhaustLimits?.highSpeedCoLevel} ${trans("lambda")} - ${fullData.exhaustResult?.lambda}`}</Col>
                    </Row>
                  </Col>
                  <Col span={2}>
                    <Row>
                      <Col className="co-result-header" span={24}>
                        {trans("result")}
                      </Col>
                    </Row>
                    <Row>
                      <Col className="co-result-icon" span={24}>
                        {fullData.exhaustResult.lambda < 1.03 && fullData.exhaustResult.lambda > 0.97 ? (
                          <div className="succes-icon">
                            <Image src={checkmark} />
                          </div>
                        ) : (
                          <div className="succes-icon">
                            <Image src={cancellmark} />
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ) : (
                <h6 className="data-not-found"> {trans("data_not_found")}</h6>
              )}
            </div>
          </div>
        </div>
        <div className="fault-table table">
          <table >
            <thead>
              <tr className="table-head">
                <th colSpan={12}>{trans("discovered_gaps")}</th>
              </tr>
            </thead>
            {fullData?.rejectedDetails?.length > 0 ? <tbody>
              <tr>
                <th colSpan={2}>{trans("gap_category")}</th>
                <th colSpan={6}>{trans("gaps")}</th>
                <th colSpan={2}>{trans("paragraph")}</th>
                <th colSpan={2}>{trans("subparagraph")}</th>
              </tr>

              {fullData?.rejectedDetails?.map((rejected, index) => {
                return (
                  <tr key={index}>
                    <td colSpan={2}>
                      {rejected?.priority === 0
                        ? trans("unimportant")
                        : rejected?.priority === 1
                          ? trans("important")
                          : trans("forbidden")}
                    </td>
                    <td colSpan={6}>{rejected.rejectedDetailName}</td>
                    <td colSpan={2}>{rejected.paragraph}</td>
                    <td colSpan={2}>{rejected.subParagraph}</td>
                  </tr>
                );
              })}
            </tbody> : <tbody><tr><td><h6 className="data-not-found"> {trans("data_not_found")}</h6></td></tr></tbody>}
          </table>
        </div>
        <div className="img-container car-photos">
          <div className="img-header">{trans("images")}</div>
          {/* {children} */}
          <Row className="images" justify={"start"}>
            {photos?.map((photo, index) => {
              return (
                <Col className="photo-item" key={index}>
                  <Image width={150} src={photo}
                    fallback="data:image/png;base64,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"
                  />
                </Col>
              );
            })}
          </Row>
          {photos ? "" : <h6 className="data-not-found"> {trans("data_not_found")}</h6>}
        </div>
        <Col xs={24} className={"details-modal-buttons"}>
          <div className="btn-container">
            {fullData.state === 0 ?
              <>
                {hasPermissions("Permissions.VehicleApplication.Done") && <Button onClick={() => handleFinishBtn()} loading={finishBtnLoad} type={"primary"} icon={<CheckOutlined />}>{trans("finish")}</Button>}
                {/* {hasPermissions("Permissions.VehicleApplication.Cancel") && <Button onClick={() => handleReturnBtn()} loading={returnBtnLoad} className={"default-outlined-btn "}>{trans("cancel")}</Button>} */}
              </>
              : fullData.state === 1 ?
              <>
              {/* add undo */}
                {hasPermissions("Permissions.VehicleApplication.Upload") && <Button onClick={() => handleUploadBtn()} loading={uploadBtnLoad} type={"primary"} icon={<UploadOutlined />}>{trans("upload")}</Button>}
                {hasPermissions("Permissions.VehicleApplication.RevertDone") && <Button onClick={() => handleRevertBtn()} loading={returnBtnLoad} className={"default-outlined-btn "} style={{ marginLeft: "10px" }} icon={<RedoOutlined />}>{trans("return")}</Button>}
                {/* {hasPermissions("Permissions.VehicleApplication.Cancel") && <Button onClick={() => handleReturnBtn()} loading={returnBtnLoad} className={"default-outlined-btn "}>{trans("cancel")}</Button>} */}
              </>
              : fullData.state === 2 ?
              <>
                {/* {hasPermissions("Permissions.VehicleApplication.UndoUpload") && <Button onClick={() => handleUndoBtn()} loading={returnBtnLoad} className={"default-outlined-btn "}>{trans("return")}</Button>} */}
              </>
              :
              <>
                {/* {hasPermissions("Permissions.VehicleApplication.RevertDone") && <Button onClick={() => handleRevertBtn()} loading={returnBtnLoad} className={"default-outlined-btn "}>გაუქმებულის დაბრუნება</Button>} */}

              </>
            }

          </div>
          <Button onClick={handleClose}>დახურვა</Button>
        </Col>
      </Row>
    </Modal>
  )
}

export default CarDetailsModal
