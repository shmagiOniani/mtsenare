import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Table,
  Dropdown,
  Menu,
  Input,
  Button,
  Space,
  Spin,
  Pagination,
  Col,
  Row,
  message,
  notification,
  Card,
  Switch,
  Carousel,
} from "antd";
import {
  FileAddOutlined,
  CaretRightOutlined,
  BorderOutlined,
  MoreOutlined,
  FilterOutlined,
  DatabaseOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
// import API from "../../utils/API";
import AddProduct from "../../components/modals/AddProduct";
import useTranslation from "../../components/translation/useTranslation";
// import Pagination from "../../components/Pagination"
import flagGeorgia from "../../images/flag_georgia.svg";
import { marks } from "../../images/marks";
import "./products.scss";
import CarsFilter from "../../components/modals/CarsFilter";
import { UserContext } from "../../components/contexts/UserContext";
import moment from "moment";

export default function Products() {
  const { Search } = Input;
  const { hasPermissions } = useContext(UserContext);
  const { trans } = useTranslation();
  let history = useHistory();

  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [tableView, setTableView] = useState(true);

  const [currentpage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState("");

  const [newData, setNewData] = useState([]);
  // key error needs key map error
  const transformData = (data) => {
    setNewData([]);
    const sorted = data.sort(
      (a, b) => new Date(a.inspectionDate) - new Date(b.inspectionDate)
    );
    sorted?.map((item, index) =>
      setNewData((prev) => [
        {
          key: index,
          carNumber: [
            item.testResult,
            item.plateNumber.slice(0, 7),
            item.id,
            item,
          ],
          testType: item?.testTypeName,
          branch: item?.branch,
          stateName: item.stateName,
          owner: item.owner,
          mark: item.mark,
          date: [
            item.timestamp.slice(0, 10),
            " ",
            item.timestamp.slice(11, 16),
          ],
          uploadedBy: item.uploadedBy,
          model: item.model,
          category: item.category,
          ptiResult: item.testResultName,
          validityPeriod: item.nextInspectionDate,
          confirmedBy: item.confirmedBy,
          carMenu: "item",
        },
        ...prev,
      ])
    );
  };

  const getData = (page, filter) => {
    setCurrentPage(page ? page : 1);
    // setLoading(true);
    // API.get(`/get-requests-handler`, {
    //   params: {
    //     url: `/VehicleApplication`,
    //     params: { States: [0, 1], Page: page ? page : 1, Count: 10, ...filter },
    //   },
    // })
    //   .then((res) => {
    //     setLoading(false);
    //     setTotal(res.data.totalCount);
    //     transformData(res.data.data.reverse());
    //     setTotalPages(res.data.totalCount);
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     notification.error({
    //       message: trans(err?.response?.data) || trans("connection_problem"),
    //       placement: "bottomLeft",
    //     });
    //   });
  };

  useEffect(() => {
    setLoading(true);
    getData(1, {});
  }, []);

  const getItemFullData = (id) => {
    // API.get(`/get-requests-handler`, {
    //   params: { url: `/VehicleApplication/${id}` },
    // })
    //   .then((res) => {
    //     toggleStatus({ id, data: res.data });
    //   })
    //   .catch((err) =>
    //     notification.error({
    //       message: trans(err?.response?.data) || trans("connection_problem"),
    //       placement: "bottomLeft",
    //     })
    //   );
  };

  const toggleStatus = ({ id, data }) => {
    data.state = 3;
    // API.put(`/put-requests-handler`, {
    //   url: `/VehicleApplication/${id}`,
    //   data: data,
    // })
    //   .then((res) => message.success(res))
    //   .catch((err) =>
    //     notification.error({
    //       message: trans(err?.response?.data) || trans("connection_problem"),
    //       placement: "bottomLeft",
    //     })
    //   );
  };

  const menu = (obj) => (
    <Menu>
      <Menu.Item>
        <Button
          onClick={() => history.push(`/car-edit/${obj.key}/general`)}
          icon={<CaretRightOutlined />}
        >
          {trans("edit")}
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          onClick={() => getItemFullData(obj.key)}
          icon={<BorderOutlined />}
        >
          {trans("data")}
        </Button>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      key: "user-mobile",
      title: trans("user"),
      render: (car) => (
        <div className="user-column">
          <div className="carNum_td">
            <Link
              to={`/car-edit/${car.carNumber[2]}/general`}
              className={"carNum"}
            >
              <div className={"carNum_flag"}>
                <img src={flagGeorgia} alt={"flag"} />
                <span>GE</span>
              </div>
              <p className={"carNum_paragraph"}>{car.carNumber[1]}</p>
              <div></div>
            </Link>
          </div>
          <div>
            {trans("date")}: <br /> {car.date}
          </div>
          {car.mark ? <div>{`${trans("mark")}: ${car.mark}`}</div> : ""}
          {car.model ? <div>{`${trans("model")}: ${car.model}`}</div> : ""}
        </div>
      ),
      responsive: ["xs"],
    },
    {
      key: "car_Menu",
      title: trans("actions"),
      render: (car) => (
        <div className="actions-container">
          <Dropdown
            overlay={() => menu(car)}
            trigger={["click"]}
            placement="bottomLeft"
            arrow
          >
            <Button shape="circle" icon={<MoreOutlined />} />
          </Dropdown>
        </div>
      ),
      responsive: ["xs"],
    },
    {
      title: trans("registration_number"),
      dataIndex: "carNumber",
      key: "carNumber",
      render: (car) => (
        <div className="carNum_td">
          <Link to={`/car-edit/${car[2]}/general`} className={"carNum"}>
            <div className={"carNum_flag"}>
              <img src={flagGeorgia} alt={"flag"} />
              <span>GE</span>
            </div>
            <p className={"carNum_paragraph"}>{car[1]}</p>
            <div></div>
          </Link>
        </div>
      ),
      responsive: ["sm"],
    },
    {
      title: trans("branch"),
      dataIndex: "branch",
      key: "branch",
      responsive: ["sm"],
    },
    {
      title: trans("status"),
      dataIndex: "stateName",
      key: "stateName",
      responsive: ["sm"],
    },
    {
      title: trans("date"),
      dataIndex: "date",
      key: "date",
      responsive: ["sm"],
    },
    {
      title: trans("test_type"),
      dataIndex: "testType",
      key: "testType",
      responsive: ["sm"],
    },
    {
      title: trans("mark"),
      dataIndex: "mark",
      key: "mark",
      render: (car) => (
        <div className={"car-mark"}>
          {/* {marks.find((icon) => icon.name === car)?.path} */}
          {car ? (
            <div>
              <img
                src={
                  marks.find((icon) => icon.name.toUpperCase() === car)?.path
                }
                alt={`logo`}
              />
              <p>{car}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      ),
      responsive: ["sm"],
    },
    {
      title: trans("model"),
      dataIndex: "model",
      key: "model",
      responsive: ["sm"],
    },
    {
      title: trans("category"),
      dataIndex: "category",
      key: "category",
      responsive: ["sm"],
    },
  ];

  const [arrangements, setArrangements] = useState(null);
  useEffect(() => {
    setArrangements({
      content: [
        {
          id: 15,
          status: "ACTIVE",
          title: "სატესტო ახალი",
          description: "სატესტო ახალი",
          periodical: "DAY",
          distributionTime: "02:02:00",
          startDate: "2023-03-02",
          endDate: "2999-01-01",
          nextExecutionDate: "2023-03-03T02:02:00",
          sampling: {
            perEvaluator: 1,
            total: null,
          },
          selectCriteria: [
            {
              serviceDurationFrom: 60,
            },
          ],
          distributionRules: [
            {
              operators: [0],
              evaluators: [2],
            },
          ],
        },
        {
          id: 14,
          status: "ACTIVE",
          title: "satesto",
          description: "asdada",
          periodical: "DAY",
          distributionTime: "18:19:06",
          startDate: "2023-03-01",
          endDate: "2999-01-01",
          nextExecutionDate: "2023-03-02T18:19:06",
          sampling: {
            perEvaluator: 1,
            total: null,
          },
          selectCriteria: [
            {
              serviceDurationFrom: 120,
            },
          ],
          distributionRules: [
            {
              operators: [2],
              evaluators: [0],
            },
          ],
        },
        {
          id: 13,
          status: "ACTIVE",
          title: "sdsfs",
          description: "FDSFSDF",
          periodical: "DAY",
          distributionTime: "17:23:26",
          startDate: "2023-03-01",
          endDate: "2999-01-01",
          nextExecutionDate: "2023-03-02T17:23:26",
          sampling: {
            perEvaluator: 1,
            total: null,
          },
          selectCriteria: [
            {
              serviceDurationFrom: 93312000000,
            },
          ],
          distributionRules: [
            {
              operators: [0],
              evaluators: [2],
            },
          ],
        },
        {
          id: 12,
          status: "ACTIVE",
          title: "ტესტ",
          description: "test",
          periodical: "DAY",
          distributionTime: "17:12:01",
          startDate: "2022-12-16",
          endDate: "2999-01-01",
          nextExecutionDate: "2022-12-17T17:12:01",
          sampling: {
            perEvaluator: null,
            total: 5,
          },
          selectCriteria: [
            {
              serviceDurationFrom: 0,
            },
          ],
          distributionRules: [
            {
              operators: [0],
              evaluators: [2],
            },
          ],
        },
        {
          id: 11,
          status: "ACTIVE",
          title: "rame",
          description: "rame",
          periodical: "MONTH",
          distributionTime: "17:02:26",
          startDate: "2022-12-16",
          endDate: "2999-01-01",
          nextExecutionDate: "2023-01-16T17:02:26",
          sampling: {
            perEvaluator: 11,
            total: null,
          },
          selectCriteria: [
            {
              serviceId: [1],
            },
            {
              serviceReceiver: 3,
            },
          ],
          distributionRules: [
            {
              operators: [0],
              evaluators: [2],
            },
          ],
        },
        {
          id: 10,
          status: "ACTIVE",
          title: "sateto",
          description: "sateto",
          periodical: "MONTH",
          distributionTime: "16:59:31",
          startDate: "2022-12-16",
          endDate: "2999-01-01",
          nextExecutionDate: "2023-01-16T16:59:31",
          sampling: {
            perEvaluator: 1,
            total: null,
          },
          selectCriteria: [
            {
              serviceDurationFrom: 660,
            },
          ],
          distributionRules: [
            {
              operators: [0],
              evaluators: [2],
            },
          ],
        },
        {
          id: 9,
          status: "ACTIVE",
          title: "ტესტ",
          description: "as",
          periodical: "DAY",
          distributionTime: "16:38:57",
          startDate: "2022-12-16",
          endDate: "2999-01-01",
          nextExecutionDate: "2022-12-17T16:38:57",
          sampling: {
            perEvaluator: null,
            total: 1,
          },
          selectCriteria: [
            {
              serviceDurationFrom: 0,
            },
          ],
          distributionRules: [
            {
              operators: [0],
              evaluators: [2],
            },
          ],
        },
        {
          id: 8,
          status: "ACTIVE",
          title: "nmkl",
          description: "dfghjk",
          periodical: "WEEK",
          distributionTime: "23:07:31",
          startDate: "2022-11-15",
          endDate: "2999-01-01",
          nextExecutionDate: "2022-11-22T23:07:31",
          sampling: {
            perEvaluator: 77,
            total: null,
          },
          selectCriteria: [
            {
              serviceDurationFrom: 540,
            },
          ],
          distributionRules: [
            {
              operators: [0],
              evaluators: [2],
            },
            {
              operators: [0],
              evaluators: [2],
            },
          ],
        },
        {
          id: 7,
          status: "ACTIVE",
          title: "jhbkml",
          description: "ubhinjokml",
          periodical: "QUARTER",
          distributionTime: "23:03:25",
          startDate: "2022-11-15",
          endDate: "2999-01-01",
          nextExecutionDate: "2023-02-15T23:03:25",
          sampling: {
            perEvaluator: 2,
            total: null,
          },
          selectCriteria: [
            {
              waitDurationFrom: 129600000,
            },
          ],
          distributionRules: [
            {
              operators: [0],
              evaluators: [2],
            },
            {
              operators: [0],
              evaluators: [2],
            },
            {
              operators: [0],
              evaluators: [2],
            },
          ],
        },
        {
          id: 6,
          status: "ACTIVE",
          title: "jhbkml",
          description: "ubhinjokml",
          periodical: "QUARTER",
          distributionTime: "23:03:25",
          startDate: "2022-11-15",
          endDate: "2999-01-01",
          nextExecutionDate: "2023-02-15T23:03:25",
          sampling: {
            perEvaluator: 2,
            total: null,
          },
          selectCriteria: [
            {
              waitDurationFrom: 2160000,
            },
          ],
          distributionRules: [
            {
              operators: [0],
              evaluators: [2],
            },
            {
              operators: [0],
              evaluators: [2],
            },
            {
              operators: [0],
              evaluators: [2],
            },
          ],
        },
        {
          id: 5,
          status: "ACTIVE",
          title: "jhbkml",
          description: "ubhinjokml",
          periodical: "QUARTER",
          distributionTime: "23:03:25",
          startDate: "2022-11-15",
          endDate: "2999-01-01",
          nextExecutionDate: "2023-02-15T23:03:25",
          sampling: {
            perEvaluator: 2,
            total: null,
          },
          selectCriteria: [
            {
              waitDurationFrom: 36000,
            },
          ],
          distributionRules: [
            {
              operators: [0],
              evaluators: [0],
            },
          ],
        },
        {
          id: 4,
          status: "ACTIVE",
          title: "jhbkml",
          description: "ubhinjokml",
          periodical: "QUARTER",
          distributionTime: "23:03:25",
          startDate: "2022-11-15",
          endDate: "2999-01-01",
          nextExecutionDate: "2023-02-15T23:03:25",
          sampling: {
            perEvaluator: 2,
            total: null,
          },
          selectCriteria: [
            {
              waitDurationFrom: 600,
            },
          ],
          distributionRules: [
            {
              operators: [0],
              evaluators: [0],
            },
          ],
        },
      ],
      pageable: {
        sort: {
          empty: false,
          sorted: true,
          unsorted: false,
        },
        offset: 0,
        pageNumber: 0,
        pageSize: 12,
        paged: true,
        unpaged: false,
      },
      totalPages: 2,
      totalElements: 15,
      last: false,
      size: 12,
      number: 0,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      numberOfElements: 12,
      first: true,
      empty: false,
    });
  }, []);

  function onChange(a) {
    return a;
  }

  const photosInst = [
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  ];

  return (
    <div className="content-wrapper">
      <div className="table-wrapper">
        <Row className="cars-card-header">
          <Col>
            <h3>{trans("current_application")}</h3>
          </Col>
          <Col className="cars-filter-wrapper">
            {/*<div className="input-group">*/}
            <Row justify="space-between" gutter={[0, 10]}>
              <Col>
                <Search
                  className="search-input"
                  placeholder={trans("search")}
                  allowClear={true}
                  onSearch={(value) => getData(1, { PlateNumber: value })}
                  style={{ width: 200 }}
                />
              </Col>
              <Col>
                <Button
                  className="filter-icon focus-white"
                  onClick={() => setFilterOpen(true)}
                  type="primary"
                  shape="round"
                  icon={<FilterOutlined />}
                  size={"large"}
                />
              </Col>
              <Col>
                <Button
                  className="filter-icon focus-white"
                  onClick={() => setTableView(!tableView)}
                  type="primary"
                  shape="round"
                  icon={tableView ? <DatabaseOutlined /> : <IdcardOutlined />}
                  size={"large"}
                />
              </Col>
              <Col>
                <Button
                  className="add-button focus-white"
                  type="primary"
                  icon={<FileAddOutlined />}
                  onClick={() => setModalIsOpen(true)}
                >
                  <span className="add-btn-text">{trans("add_product")}</span>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="table-pagination">
          {tableView ? <div className="cards-wrapper">
            <Row gutter={[20, 24]} wrap={true}>
              {arrangements?.content?.map((item, index) => (
                  
                  <Col
                  xs={{ span: 24 }}
                  md={{ span: 24 }}
                  lg={{ span: 12 }}
                  xl={{ span: 8 }}
                  xxl={{ span: 6 }}
                  key={index}
                >
                  <Card
                    title={
                      <div className="card-title">
                        <p>{item?.title}</p>
                      </div>
                    }
                  >
                    <div className="card-content">
                      {/* <p>{item?.description}</p> */}
                      <Carousel afterChange={onChange}>
                        {photosInst?.map((photo, ind) => {
                          return (
                            <div key={ind} className="car-img">
                              <img alt="pti-img" width={150} src={photo} />
                            </div>
                          );
                        })}
                      </Carousel>
                    </div>
                    <div className="card-footer">
                      <div>
                        {/* <span>ატვირთულია:</span> */}
                        <p>
                          {moment(item?.nextExecutionDate).format("L, H:mm")}
                        </p>
                      </div>
                      <div>
                        <span>ვარგისია</span>
                        <p>{item.id}</p>
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        <Switch
                          onClick={(v) => {
                            // changeStatus(v, item?.id);
                          }}
                          // eslint-disable-next-line eqeqeq
                          checked={item?.status == "ACTIVE" ? true : false}
                        />
                      </div>
                    </div>
                  </Card>
                </Col>

              ))}
            </Row>
          </div>
          :
          <div className="products-table">
              {/* <FadeIn className="fade-instance" > */}

            <Table
              columns={columns}
              dataSource={newData}
              pagination={false}
              className={"users-table"}
            />
            {/* </FadeIn> */}
          </div>
            }
          <Row className="currents-pagination" justify={"end"}>
            <Col >
              {hasPermissions("Permissions.VehicleApplication.Count") && (
                <div >
                  {trans("total")}: <span>{arrangements?.content.length}</span>
                </div>
              )}
              <Pagination
                showSizeChanger={false}
                current={currentpage}
                onChange={(page) => getData(page)}
                pageSize={"10"}
                total={totalPages}
              />
            </Col>
          </Row>
        </div>
      </div>
      <AddProduct
        open={modalIsOpen}
        setOpen={setModalIsOpen}
        refresh={getData}
      />
      <CarsFilter
        modalIsOpen={filterOpen}
        setModalIsOpen={setFilterOpen}
        onSubmite={(data) => transformData(data)}
        newTotal={(amount) => setTotalPages(amount)}
      />
      {/* {loading && (
        <Space size="middle" className="loading">
          <Spin size="large" />
        </Space>
      )} */}
    </div>
  );
}
