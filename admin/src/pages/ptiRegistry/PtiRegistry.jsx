import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { Table, ExportTableButton } from "ant-table-extensions";
import { Tooltip, Menu, Dropdown, Button, Space, Spin, Row, Col, Pagination, Select, Input, message, notification } from 'antd';
import { PrinterOutlined, FileExcelOutlined, MoreOutlined, EditOutlined, EyeOutlined, FileAddOutlined, RedoOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import { FilterOutlined } from "@ant-design/icons";
import API from "../../utils/API"
import useTranslation from '../../components/translation/useTranslation';
import ApplicationForm from '../../components/PDFViews/ApplicationForm';
import InvoiceForm from '../../components/PDFViews/InvoiceForm';
import flagGeorgia from "../../images/flag_georgia.svg"
import PtiRegistryFilter from "../../components/modals/PtiRegistryFilter"
import CarEditReason from '../../components/modals/CarEditReason';
import AddProduct from '../../components/modals/AddProduct';
import SliderModal from '../../components/modals/SliderModal';
import { UserContext } from '../../components/contexts/UserContext';
import "./PtiRegistry.scss"



function PtiRegistry() {
    
    let history = useHistory();
    const { Option } = Select;
    const { trans } = useTranslation();
    const {hasPermissions} = useContext(UserContext)

    const [loading, setLoading] = useState(false)
    const [filterOpen, setFilterOpen] = useState(false)

    const [tableData, setTableData] = useState([])
    const [addCarModalIsOpen, setAddCarModalIsOpen] = useState(false);


    const [pdfOn, setPdfOn] = useState(false)
    const [pdfData, setPdfData] = useState({})
    const [pdfLan, setPdfLan] = useState("ka")
    const [resonModalOpen, setReasonModalOpen] = useState(false)
    const [selectedId, setSelectedId] = useState("")

    const [selectedIds, setSelectedIds] = useState([])
    const [selectedObjs, setSelectedObjs] = useState([])
    const [selectedAction, setSelectedAction] = useState(trans("choose_action"))
    const [organizationName, setOrganizationName] = useState("")
    const [invoiceModalOpen, setInvoiceModalOpen] = useState(false)

    const [sliderModalOpen, setSliderModalOpen] = useState(false)

    const [currentpage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [total, setTotal] = useState(1)
    const [returnBtnLoad, setReturnBtnLoad]=useState(false)


    const [photos, setPhotos] = useState([])

    const { Search } = Input;


    const handlePdfApi = (lan, id) => {
        setPdfLan(lan)
        API.get(`/get-requests-handler`, { params: { url: `/VehicleApplication/${id}/details` } })
            .then((res) => {
                if (res.data.name === "Error") {
                    message.error(res.data.message);
                } else {
                    setPdfData(res.data);
                    setPdfOn(true)
                }

            })
            .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
        setPdfOn(false)
    }

    const menu = (id, state) => {
        return (
            <Menu>
                  <Menu.Item key="0" icon={<PrinterOutlined />} onClick={() => handlePdfApi("ka", state?.carMenu?.id)}>
                    {trans("print")} ka
                </Menu.Item>
                <Menu.Item key="1" icon={<PrinterOutlined />} onClick={() => handlePdfApi("en", state?.carMenu?.id)}>
                    {trans("print")} en
                </Menu.Item>
                <Menu.Divider />
                {state?.state !== 3 ? 
                <Menu.Item key="3" icon={<EditOutlined />}>
                    <div onClick={() => handleReasonModal(state?.carMenu?.id)}>{trans("edit")}</div>
                </Menu.Item>
                :""}
                <Menu.Item key="4" icon={<EyeOutlined />}>
                    <div onClick={() => handleDetailsModal(state?.carMenu?.id)}>{trans("details")}</div>
                </Menu.Item>
                {hasPermissions("Permissions.VehicleApplication.Cancel") && <Menu.Item key="5" icon={<RedoOutlined />}>
                    <div onClick={() => handleUndoBtn(state?.carMenu?.id)}>{trans("return")}</div>
                </Menu.Item>}
            </Menu>
        )
    }

    const transformData = (data) => {
        setTableData([])
        const sorted = data.sort((a, b) => new Date(a.inspectionDate) - new Date(b.inspectionDate))
        sorted?.map((item, index) =>
            setTableData(prev => [{
                key: index,
                carNumber: [item?.testResult, item?.plateNumber.slice(0, 7), item?.id, item],
                branch: item?.branch,
                fullName: item?.owner,
                testType: item?.testTypeName,
                result: item?.testResult === 1 ? trans("pass") : item?.testResult === 0 ? trans("did_not_pass") : trans("forbidden"),
                mark: item?.mark,
                date: [item.timestamp.slice(0, 10), " ", item.timestamp.slice(11, 16)],
                state: item?.state,
                category: item?.category,
                // ptiResult: item?.testResultName,
                validityPeriod: item?.nextInspectionDate,
                uploadedBy: item?.uploadedBy,
                confirmedBy: item?.confirmedBy,
                carMenu: item
            }, ...prev])
        )
    }

    const handleSlider = (carId) => {
        setPhotos([])
        // setLoading(true)
        API.get(`/get-requests-handler`, { params: { url: `/VehicleApplication/${carId}` } })
        .then((res) => {
          if(res.data.name === "Error"){
            message.error(res.data.message);
          }else {
            setPhotos(res.data.photos);
            setSliderModalOpen(true);
        }
        })
        .catch((err) => {
          notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
        })

    }

    const columns = [
        {
            key: 'user-mobile',
            dataIndex: "",
            title: trans('user'),
            render: (car) => (
                <div className='user-column'>
                    <div className="carNum_td" onClick={()=> handleSlider(car[3].id)}>
                        <div className={"carNum"}>
                            <div className={"carNum_flag"}>
                                <img src={flagGeorgia} alt={"flag"} />
                                <span>GE</span>
                            </div>
                            <p className={"carNum_paragraph"}>{car.carNumber[1]}</p>

                                <div
                                    className={`carNum_dot carNum_dot--${car.carNumber[0] === 1 ? "green" : "red"}`}>
                                </div>
                        </div>
                    </div>
                    <div>{trans("date")}: <br/> {car.date}</div>
                    {car.owner ? <div>{`${trans("owner")} : ${car.owner}`}</div>: ""}
                    {car.mark ? <div>{`${trans("mark")} : ${car.mark}`}</div>: ""}
                    {car.model ? <div>{`${trans("model")} : ${car.model}`}</div>: ""}
                </div>
            ),
            responsive: ["xs"]
        },
        {
            key: "car_Menu",
            dataIndex: "",
            title: trans("actions"),
            render: car =>
                <div className={"actions-container"}>
                    <Dropdown overlay={menu(car.id)} trigger={['click']}>
                        <div className="carMenu_icon">
                            <MoreOutlined />
                        </div>
                    </Dropdown>
                </div>,
            responsive: ["xs"]
        },
        {
            title: trans("registration_number"),
            dataIndex: 'carNumber',
            key: 'carNumber',
            render: car =>
                <div className="carNum_td" onClick={() =>  handleSlider(car[3].id)}>
                    <Tooltip color={"blue"} placement="bottom" title={trans("images")}>
                        <div className={"carNum"}>
                            <div className={"carNum_flag"}>
                                <img src={flagGeorgia} alt={"flag"} />
                                <span>GE</span>
                            </div>
                                <p className={"carNum_paragraph"}>{car[1]}</p>
                            <div>
                            </div>
                        </div>
                    </Tooltip>
                </div>,
            responsive: ["sm"]
        },
        {
            title: trans("branch"),
            dataIndex: 'branch',
            key: 'branch',
            responsive: ["sm"],
        },
        {
            title: trans("date"),
            dataIndex: 'date',
            key: 'date',
            responsive: ["sm"],
        },
        {
            title: trans('owner'),
            dataIndex: 'fullName',
            key: 'fullName',
            responsive: ["sm"]
        },
        {
            title: trans('result'),
            dataIndex: 'result',
            key: 'result',
            responsive: ["sm"]
        },
        {
            title: trans("test_type"),
            dataIndex: 'testType',
            key: 'testType',
            responsive: ["sm"]
        },
        // {
        //     title: trans("mark"),
        //     dataIndex: 'mark',
        //     key: 'mark',
        //     render: car =>
        //         <div className={"car-mark"} >
        //             {/* <img src={logo} alt={"logo"} /> */}
        //             <p>{car}</p>
        //         </div>,
        //     responsive: ["sm"]
        // },
        {
            title: trans("status"),
            dataIndex: 'state',
            key: 'state',
            render: status =>
            <div  >
                <p>{status === 2 ? trans("uploaded") : trans("canceled")}</p>

            </div>,
            responsive: ["sm"]
        },
        {
            title: trans("category"),
            dataIndex: 'category',
            key: 'category',
            responsive: ["sm"]
        },
        // {
        //     title: trans("pti_result"),
        //     dataIndex: 'ptiResult',
        //     key: 'ptiResult',
        //     responsive: ["sm"]
        // },
        {
            title: trans("validity_period"),
            dataIndex: 'validityPeriod',
            key: 'validityPeriod',
            responsive: ["sm"]
        },
        {
            title: trans("confirmed_by"),
            dataIndex: 'confirmedBy',
            key: 'confirmedBy',
            responsive: ["sm"]
        },
        {
            title: trans("uploaded_by"),
            dataIndex: 'uploadedBy',
            key: 'uploadedBy',
            responsive: ["sm"]
        },
        {
            key: "carMenu",
            dataIndex: "",
            title: trans("menu"),
            render: car =>
                <div className="actions-container">
                    <Dropdown overlay={menu(car.id, car)} trigger={['click']}>
                        <Button shape="circle" icon={<MoreOutlined />} size={"large"} />
                    </Dropdown>
                </div>,
            responsive: ["sm"]
        }
    ]

    const getPhotos = () => {
        setLoading(true)
        API.get(`/get-requests-handler`, { params: { url: `/VehicleApplication/${selectedId}` } })
          .then((res) => {
            setPhotos(res.data.photos);
            setLoading(false)
          })
          .catch((err) => {
            setLoading(false)
            notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"});
          })
      };
    

    const getData = (page, filter) => {
        console.log("page change",page);
        setCurrentPage(page ? page : 1)
        API.get(`/get-requests-handler`, { params: { url: `/VehicleApplication`, params: { States: [ 2, 3], Page: page ? page : 1, Count: 10, ...filter  } } })
            .then(
                (res) => {
                    setTotal(res?.data?.totalCount)
                    setTotalPages(res?.data?.totalCount)
                    setLoading(false)
                    transformData(res?.data?.data.reverse())
                }
            )
            .catch((err) => {
                setLoading(false)
                notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"})
            })
    }

    const handleDetailsModal = (id) => {
        console.log(id);
        setSelectedId(id)
        setDetailsModalOpen(true)
    }

    const handleReasonModal = (id) => {
        setSelectedId(id)
        API.get(`/get-requests-handler`, { params: { url: `/VehicleApplication/${id}`, params: {} } })
            .then((res) => {
      
                if (res.data.state !== 1) {
                    setReasonModalOpen(true)
                } else {
                    history.push(`/car-edit/${id}/general`)

                }
            })
            .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}))
    }

    const handleUndoBtn = (id) => {
        setReturnBtnLoad(true)
        API.post(`/post-requests-handler`, { url: `/VehicleApplication/${id}/undoUpload`, params: {}, data: {} })
          .then(res => setReturnBtnLoad(false))
          .catch((err) => {
            setReturnBtnLoad(false);
            getData()
            notification.error({ message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft" })
          })
      }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedIds(selectedRowKeys)
            setSelectedObjs(selectedRows?.map(item => item.carMenu))
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    const handleSubmitAction = () => {
        if (selectedAction === "invoice") {
            setInvoiceModalOpen(true)
        }
    }

    useEffect(() => {
        setLoading(true)
        getData();
    }, [])

    return (
        <>
            <div className='content-wrapper registry-wrapper'>
                <div className="registry-table">
                    <Row className="table-header">
                        <Col>
                            <h3>{trans('registry')}</h3>
                        </Col>
                        <Col>
                            <div className="filter">
                                <Search className='search-input' placeholder={trans('search')} allowClear={true} onSearch={(value) => getData(1, { PlateNumber: value })} style={{ width: 200 }} />

                                <Button  className='filter-icon focus-white' onClick={() => setFilterOpen(true)} type="primary" shape="round" icon={<FilterOutlined />} size={"large"} />
                                {hasPermissions("Permissions.VehicleApplication.Add") && <Button className='focus-white' type="primary" icon={<FileAddOutlined />} onClick={() => setAddCarModalIsOpen(true)}>
                                    <span className='add-btn-text'>{trans('add_car')}</span>
                                </Button>}
                            </div>
                        </Col>
                    </Row>
                    <Table
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={tableData}
                        pagination={false} />

                    <Row gutter={[16, 16]} className='table-footer'>
                        <Col>

                            <Row gutter={[0, 20]} className="footer-actions-container">
                                <Col>
                                    <Select defaultValue={selectedAction} placeholder={trans("choose")} onChange={(e) => setSelectedAction(e)}>
                                        <Option value='export'>{trans("export_as_excell")}</Option>
                                        {hasPermissions("Permissions.Invoice.Add") && <Option value='invoice'>{trans("invoice_order")}</Option>}
                                    </Select>
                                </Col>
                                <Col>
                                    {selectedAction === "export" ?
                                        <ExportTableButton
                                            dataSource={tableData}
                                            columns={columns}
                                            btnProps={{ type: "primary", icon: <FileExcelOutlined /> }}
                                            showColumnPicker >
                                            {trans("print_data")}
                                        </ExportTableButton>
                                        : selectedAction === "invoice" ?
                                            <Row justify='center' align={"middle"} gutter={[16, 16]}>
                                                <Col>
                                                    <Input placeholder={trans("organization_name")} onChange={(e) => setOrganizationName(e.target.value)} />
                                                </Col>
                                                <Col>
                                                    <Button disabled={selectedIds?.length < 1} type={"primary"} onClick={organizationName?.length > 0 && handleSubmitAction}>{trans("submit")}</Button>
                                                </Col>
                                            </Row>
                                        : ""}
                                </Col>
                            </Row>
                        </Col>
                        <Col style={{display: "flex"}}>
                            {hasPermissions("Permissions.VehicleApplication.Count") && <div style={{marginRight: "20px"}}>{trans('total')}: <span>{total}</span></div>}
                            <Pagination showSizeChanger={false} current={currentpage} onChange={(onChange) => getData(onChange)} pageSize={"10"} total={totalPages} onShowSizeChange={(datas)=> console.log(datas)}/>
                            
                        </Col>
                    </Row >

                </div>
            </div>
            <PtiRegistryFilter modalIsOpen={filterOpen} setModalIsOpen={setFilterOpen} onSubmite={(data) => transformData(data)} newTotal={(amount) => setTotalPages(amount)} /> 
            {pdfOn && <ApplicationForm data={pdfData} handleClose={() => setPdfOn(false)} language={pdfLan} />}
            <AddProduct modalIsOpen={addCarModalIsOpen} setModalIsOpen={setAddCarModalIsOpen} rerender={getData}/>
            <InvoiceForm
                isOpen={invoiceModalOpen}
                handleClose={setInvoiceModalOpen}
                organizationName={organizationName}
                cars={selectedObjs} />
            <SliderModal modalIsOpen={sliderModalOpen} handleClose={() => setSliderModalOpen(false)} photos={photos} />
            {loading &&
                <Space size="middle" className='loading'>
                    <Spin size="large" />
                </Space>
            }
            <CarEditReason id={selectedId} modalIsOpen={resonModalOpen} handleClose={() => setReasonModalOpen(false)} />
        </>
    )
}

export default PtiRegistry
