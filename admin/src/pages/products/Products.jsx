import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Table,
  Dropdown,
  Menu,
  Input,
  Button,
  Pagination,
  Col,
  Row,
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
import API from "../../utils/API";
import AddProduct from "../../components/modals/AddProduct";
import useTranslation from "../../components/translation/useTranslation";
// import Pagination from "../../components/Pagination"
import flagGeorgia from "../../images/flag_georgia.svg";
import { marks } from "../../images/marks";
import "./products.scss";
import CarsFilter from "../../components/modals/CarsFilter";
import { UserContext } from "../../components/contexts/UserContext";
import ProductCard from "./ProductCard";

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
  const [productsList, setProductsList] = useState(null);

  const [newData, setNewData] = useState([]);
  
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
    API.get(`/api/products?all=true`).then((res) => {
      setProductsList(res.data.items);
      setTotal(res.data.numTotal);
    });
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
          {tableView ? (
            <div className="cards-wrapper">
              <Row gutter={[20, 24]} wrap={true}>
                {productsList?.map((item, index) => (
                  <Col
                    xs={{ span: 24 }}
                    md={{ span: 24 }}
                    lg={{ span: 12 }}
                    xl={{ span: 8 }}
                    xxl={{ span: 6 }}
                    key={index}
                  >
                    <ProductCard item={item} />
                    {/* <Card
                      title={
                        <div className="card-title">
                          <p>{item?.title}</p>
                        </div>
                      }
                    >
                      <div className="card-content">
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
                            }}
                            checked={item?.status == "ACTIVE" ? true : false}
                          />
                        </div>
                      </div>
                    </Card> */}
                  </Col>
                ))}
              </Row>
            </div>
          ) : (
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
          )}
          <Row className="currents-pagination" justify={"end"}>
            <Col>
              {hasPermissions("Permissions.VehicleApplication.Count") && (
                <div>
                  {trans("total")}: <span>{total}</span>
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