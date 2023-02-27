import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import jsPDF from "jspdf";
import logoOne from "../../images/form-logo-1.png"
import logoTwo from "../../images/form-logo-2.jpeg"
import translations from '../translation/translation.json';
import "./style.scss";


function ApplicationForm({ id, handleClose, data, language }) {
  const [fuelType, setFuelType] = useState(1);

  const trans = (text) => {
    return translations?.[language]?.[text];
  };
  const docToPrint = React.createRef();

  const printPDF = () => {
    var doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector("#topdf"),{
      callback: function(pdf) {
        var pageCount = doc.internal.getNumberOfPages();
        for (var index = pageCount; index > 1; index--) {
          pdf.deletePage(index);
        }
        window.open(pdf.output('bloburl'))
      }
    })
  }
  useEffect(() => {
    printPDF();
    setFuelType(data?.exhaustResult?.type);
  }, []);

  const ptiDetails = [
    {
      name: trans("registration_number"),
      value: data?.plateNumber?.toUpperCase() ,
    },
    {
      name: trans("pti_time"),
      value: data?.testType?.id === 1 ? data?.inspectionDate : data?.InspectionStartDate,
    },
    {
      name: trans("secondary_pti"),
      value: data?.nextInspectionDate || "-",
    },
    {
      name: trans("pti_validity"),
      value: data?.testResult === 1 ? data?.nextInspectionDate : "-",
    },
    {
      name: trans("vehicle_category_doors_count"),
      value: data?.category?.name + " / " +data?.doorsCount,
    },
    {
      name: trans("vin_chasi_body_no"),
      value: data?.vinCode || "-",
    },
    {
      name: trans("mark_model"),
      value: data?.mark + " / " + data?.model,
    },
    {
      name: trans("engine_type_vol"),
      value: data?.fuelType + " / " + data?.engineVolume,
    },
    {
      name: trans("first_reg_ate_in_georgia"),
      value: data?.initialRegistrationDate || "-",
    },
    {
      name: trans("vehicle_manufacture_date"),
      value: data?.year || "-",
    },
    {
      name: trans("odometer_value_odometer_type"),
      value: data?.odometerValue + " / " +  data?.odometerUnit,
    },
    {
      name: trans("catalyst_actual"),
      value: data?.catalycConverter ? "yes" : "no",
    },
    {
      name: trans("lpg_or_cng_cert"),
      value: data?.lpgCertificate ? data?.lpgCertificate?.certificateNumber || "-" 
                                    : data?.cngCertificate?.certificateNumber || "-",
    },
    {
      name: trans("lpg_or_cng_sticker"),
      value: data?.lpgCertificate ? data?.lpgCertificate?.bannerNumber || "-" 
                                    : data?.cngCertificate?.bannerNumber || "-",
    },
    {
      name: trans("lpg_or_cng_validity_end"),
      value: data?.lpgCertificate ? data?.lpgCertificate?.validUntil || "-"  
                                    : data?.cngCertificate?.validUntil || "-" ,
   },
    {
      name: trans("tacograph"),
      value: data?.tachograph ? "yes" : "no",
    },
    {
      name: trans("speed_limiter_device"),
      value: data?.speedLimiter ? "yes" : "no",
    },
    {
      name: trans("str_wheel_position_actual"),
      value: data?.wheelPosition || "-",
    },
    {
      name: trans("str_wheel_position_first_reg"),
      value: data?.stockWheelPosition,
    },
    {
      name: trans("vehicle_type_destination"),
      value: data?.bodyType,
    },
  ];

  const testResults = [
    {
      name: trans("vehicle_identification"),
      value: data?.ssIdentificationPassed,
    },
    {
      name: trans("braking_device"),
      value: data?.brakeDevicePassed,
    },
    {
      name: trans("steering_system"),
      value: data?.wheelControlSystemPassed,
    },
    {
      name: trans("visibility"),
      value: data?.visibilityPassed,
    },
    {
      name: trans("headlights_beam_deflectors"),
      value: data?.headlightsAndReflectivePassed,
    },
    {
      name: trans("axes_wheels_tires"),
      value: data?.wheelsAndTiresPassed,
    },
    {
      name: trans("chassis_and_components"),
      value: data?.chassisAndComponentPassed,
    },
    {
      name: trans("other_devices"),
      value: data?.otherDevicesPassed,
    },
    {
      name: trans("negative_impact"),
      value: data?.negativeImpactsPassed,
    },
    {
      name: `${trans("additional_requirements")} (M2,M3)`,
      value: data?.category?.id === 2 || data?.category?.id === 3 ?  data?.additionalInspectionPassed : "-" ,
    },
  ];

  return (
    <>
      <div className="pdf-form">
        <div id={"topdf"} className="page-wrapper" ref={docToPrint}>
          <div className="page-header">
            <div className="main-header">
              <div className="img-container">
                <img src={logoOne} alt="" />
              </div>
              <div className="title" >
                <p>{`პერიოდული ტექნიკური ინსპექტირების ანგარიში N: ${data?.uniqueId}`}</p>
                <p>{`ასს-ს პერიოდული ტექნიკური ინსპექტირების ცენტრი შ.პ.ს ქვიქტესტი ქ.თბილისი, ჯ.ბალანჩინის N36`}</p>
                <p>www.quicktest.ge - 032 2 48 00 42</p>

              </div>
              <div className="img-container">
                <img src={logoTwo} alt="" />
              </div> 
              </div>
            {/* <div className="sub-header">
              <p>{`${data?.company}`}</p>
            </div> */}
          </div>
          <div className="full-width-item">
            <div className="header">პერიოდული ტექნიკური ინსპექტირების ცენტრის აკრედიტაციის მოწმობის ნომერი</div>
            <div className="content">{"item.value"}</div>
          </div>
    
          <div className="items-container">
            {ptiDetails?.map((item, index) => {
              return (
                <div key={index} className="item-wrapper ">
                  <div className="item ">
                    <div className="item-header " >{item.name}</div>
                    <div className="item-body " >
                    {item.value === "-" ? (
                      <div className="result-icon ">
                          -
                        </div>
                      ) : item.value === "yes" ? (
                        <div className="result-icon succes-icon"/>
                       
                      ) : item.value === "no" ? (
                        <div className="result-icon reject-icon"/>
                      ): item.value}
                      </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="line" />
          <div className="items-container">
            {testResults?.map((item, ind) => {
              return (
                <div key={"0" + ind} className="item-wrapper">
                  <div className="item ">
                    <div className="item-header">{item.name}</div>
                    <div className="item-body">
                      {item.value === "-" ? (
                        <div className="result-icon ">
                          -
                        </div>
                      ) : item.value ? (
                        <div className="result-icon succes-icon"/>
                      ) : (
                        <div className="result-icon reject-icon"/>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="fault-table table">
            <table style={{ width: 600 }}>
              <thead>
                <tr>
                  <th colSpan={12}>{trans("discovered_gaps")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th colSpan={2}>{trans("gap_category")}</th>
                  <th colSpan={6}>{trans("gaps")}</th>
                  <th colSpan={2}>{trans("paragraph")}</th>
                  <th colSpan={2}>{trans("subparagraph")}</th>
                </tr>

                {data?.rejectedDetails?.map((rejected, index) => {
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
              </tbody>
            </table>
          </div>
          {data.fuelType !== "ელექტრო" && <div className="brakes-table ant-table">
            <div>
              <Row className="table-head">
                <Col span={24}> {trans("exhaust_test")}</Col>
              </Row>
            </div>
            <table style={{ width: "100%" }} className={"table-body"}>
              <thead>
                <tr>
                  <th colSpan={5}>{trans("measurement_results")}</th>
                  <th colSpan={1}>{trans("established_norm")}  {(fuelType === 2 || fuelType === 7) && `: ${data?.exhaustResult?.highSpeedCo}`}</th>
                  <th colSpan={1}>{trans("result")}</th>
                </tr>
              </thead>
              {fuelType === 2 || fuelType === 7 ? 
              <tbody>
                <tr>
                  <td >I - RPM / M</td>
                  <td >II - RPM / M</td>
                  <td >III - RPM / M</td>
                  <td >IV - RPM / M</td>
                  <td >{trans("est_avr")}</td>
                  <td rowSpan={2}>{trans("max")} : {data?.exhaustLimits?.highSpeedCoLevel}</td>
                  <td rowSpan={2}>{data?.exhaustResult?.highSpeedCo <=  data?.exhaustLimits?.highSpeedCoLevel ? <div className="result-icon succes-icon"/> : <div className="result-icon reject-icon"/>}</td>
                </tr>
                <tr>
                  {data?.exhaustResult?.exhausts?.map((exhaust, index) => {
                    return (
                      <td key={index} >
                        {exhaust.speed} - {exhaust.co}
                      </td>
                    );
                  })}
                  {data?.exhaustResult?.exhausts.length < 4 ? (
                    <td>
                      NULL - 0
                    </td>
                  ) : (
                    <td >
                      {data?.exhaustResult?.exhausts[4]?.speed} - {data?.exhaustResult?.exhausts[4]?.co}
                    </td>
                  )}
                   <td>
                    {data?.exhaustResult?.highSpeedCo}
                  </td>
                </tr>
              </tbody> 
              : fuelType === 1 || fuelType === 5 ? 
              <tbody>
                <tr>
                  <td colSpan={2}>{`${trans("loafer_the_move")} / CO`}</td>
                  <td colSpan={2}>{`${trans("with_high_torque")} / CO`}</td>
                  <td colSpan={1}>{trans("lambda")}</td>
                  <td rowSpan={2}>{`${trans("loafer_the_move")} CO - ${data?.exhaustLimits?.normalSpeedCoLevel} - ${trans("with_high_torque")} CO - ${data?.exhaustLimits?.highSpeedCoLevel} ლამბდა - ${data?.lambdaLimits?.min} - ${data?.lambdaLimits?.max}`}</td>
                  <td rowSpan={2}>{data?.exhaustResult?.highSpeedCo <=  data?.exhaustLimits?.highSpeedCoLevel ? <div className="result-icon succes-icon"/> :  <div className="result-icon reject-icon"/>}</td>
                </tr>
                <tr>
                  {data?.exhaustResult?.exhausts ? data?.exhaustResult?.exhausts.map((exhaust, index) => {
                    return (
                      <td key={index} colSpan={2}>
                        {exhaust?.speed || trans("not_found")} - {exhaust?.co || trans("not_found")}
                      </td>
                    );
                  }) : ["", ""].map((exhaust, index) => {
                    return (
                      <td key={index} colSpan={2}>
                        {trans("not_found")}
                      </td>
                    );
                  })}
                  <td >
                    {data?.exhaustResult?.lambda}
                  </td>
                </tr>
              </tbody>
              : ""}
            </table>
          </div>}
          <div className="brakes-table ant-table">
            <div>
              <Row className="table-head">
                <Col span={24}> {trans("brake_test")}</Col>
              </Row>
            </div>
            <table style={{ width: "100%" }} className={"table-body"}>
              <thead>

                <tr>
                  <th>{trans("axis")}</th>
                  <th colSpan={6}>{trans("the_result_obtained")}</th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <td></td>
                  <td>{trans("right")}</td>
                  <td>{trans("left")} </td>
                  <td>{trans("effective")}</td>
                  <td>{trans("difference")}</td>
                  <td>{trans("weight")}</td>
                  <td>{trans("result")}</td>
                </tr>
                {data?.brakeResult?.brakes?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="left ">
                        {item.type === 2
                          ? trans("parking_brake")
                          : `${trans("axis")} ${" "}   ${index + 1}`}
                      </td>
                      {<td>{item.rightAxlePower} kN</td>}
                      {<td>{item.leftAxlePower} kN</td>}
                      <td>{item.axleEfficiency} %</td>
                      <td>
                        {item.type === 1 &&
                          `${item.differenceBetweenLegs} %`}
                      </td>
                      <td>{item.leftAxleWeight + item.rightAxleWeight}{trans("kg")}</td>
                      <td className="center">
                        {item.type === 2 ? (
                          item.axleEfficiency >
                            data?.parkingBrakesEfficiencyLimit ? (
                            <div className="succes-icon result-icon"/>
                          ) : (
                            <div className="reject-icon result-icon"/>
                          )
                        ) : item.axleEfficiency >
                          data?.serviceBrakesEfficiencyLimit ? (
                          item?.differenceBetweenLegs <
                            data?.differenceBetweenLegsLimit ? (
                            <div className="succes-icon result-icon"/>
                          ) : (
                            <div className="reject-icon result-icon"/>
                          )
                        ) : (
                          <div className="reject-icon result-icon"/>
                        )}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="left">{trans("overall_efficiency")}</td>
                  <td className="txt-center" colSpan={5}>
                    {data?.brakeResult?.serviceBrakesEfficiency}% ({trans("norm")}:{" "}
                    {data?.serviceBrakesEfficiencyLimit}%)
                  </td>
                  <td className="center">
                    {data?.brakeResult?.serviceBrakesEfficiency >
                      data?.serviceBrakesEfficiencyLimit ? (
                      <div className="succes-icon result-icon"/>
                    ) : (
                      <div className="reject-icon result-icon"/>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="left">{`${trans("overall_efficiency")} (${trans("parking_brake")})`}</td>
                  <td className="txt-center" colSpan={5}>
                    {data?.brakeResult?.parkingBrakesEfficiency}% ({trans("norm")}:{" "}
                    {data?.parkingBrakesEfficiencyLimit}%)
                  </td>
                  <td className="center">
                    {data?.brakeResult?.parkingBrakesEfficiency >
                      data?.parkingBrakesEfficiencyLimit ? (
                      <div className="succes-icon result-icon"/>
                    ) : (
                      <div className="reject-icon result-icon"/>
                    )}
                  </td>
                </tr>
              </tbody>

            </table>
          </div>
          <div className="inspection-result">
            <div>
              {trans("inspection_result")}:
              <div className="icon center">
                {data?.testResult?.id === 1 ? (
                  <div className="succes-icon result-icon"/>
                ) : (
                  <div className="reject-icon result-icon"/>
                )}
              </div>
              <span>
                {data?.testResult?.id === 1  ? trans("success") : trans("fault")}
              </span>
            </div>
          </div>
          <div className="inspector-comment">
            <div className="header">{trans("inspector_comment")}</div>
            <div className="comments-container">
              <div>
                {data?.comment}
              </div>
            </div>
          </div>
          <div className="sign">
            <div className="responsible">პასუხისმგებელი პირი: ({data.user})</div>
            <div>{`${trans("signature")}_____________________`}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplicationForm;
