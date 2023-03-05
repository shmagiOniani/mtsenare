import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  Input,
  Button,
  Pagination,
  Col,
  Row,
  Switch,
  message,
  notification,
  Tooltip,
} from "antd";
import {
  FileAddOutlined,
  FilterOutlined,
  DatabaseOutlined,
  IdcardOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import API from "../../utils/API";
import AddProduct from "../../components/modals/AddProduct";
import useTranslation from "../../components/translation/useTranslation";
// import Pagination from "../../components/Pagination"
import "./products.scss";
import CarsFilter from "../../components/modals/CarsFilter";
import { UserContext } from "../../components/contexts/UserContext";
import ProductCard from "../../components/productCard/ProductCard";
import moment from "moment";

export default function Products() {
  const { Search } = Input;
  const { hasPermissions } = useContext(UserContext);
  const { trans } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [tableView, setTableView] = useState(true);

  const [currentpage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState("");
  const [productsList, setProductsList] = useState(null);

  const [newData, setNewData] = useState([]);

  const [categoryList, setCategoryList] = useState([]);
  const [typesList, setTypesList] = useState([]);

  const getLibraryes = () => {
    API.get(`/api/libraries?all=true`).then((res) => {
      let categoryInst = res.data.items.find(
        (item) => item.name === "Category"
      ).library;
      let typesInst = res.data.items.find(
        (item) => item.name === "Types"
      ).library;
      setCategoryList(categoryInst);
      setTypesList(typesInst);
    });
  };

const transformDate = (date)=> {
  return moment(date).format("YY.MM.DD, H:mm")
}

  const transformData = (data) => {
    setNewData([]);

    data?.map((item, index) =>
      setNewData((prev) => [
        {
          key: item._id,
          name: item.name,
          date: transformDate(item.createdAt),
          shop: "მაღაზია",
          price: item.price,
          category: categoryList.find((i) => item.category === i._id)?.name,
          status: item,
          productMenu: item,
          quantity: item.quantity
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
      transformData(res.data.items);
    });
  };

  const deleteData = (id) => {
    API.delete(`/api/products/${id}`)
      .then((res) => message.success(res))
      .finally(() => getData());
  };

  useEffect(() => {
    setLoading(true);
    getLibraryes();
    getData(1, {});
  }, []);

  const openEditModal = (id) => {
    setModalIsOpen(true)
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

  const toggleStatus = ({ status, id }) => {
    API.put(`/api/products/status`, { status })
      .then((res) => message.success(res))
      .catch((err) => {
        notification.error({
          message: trans(err?.response?.data) || trans("connection_problem"),
          placement: "bottomLeft",
        });
      })
      .finally(() => getData());
  };

  const columns = [
    {
      key: "xsColumn",
      title: "ინფორმაცია",
      render: (product) => (
        <div className="xs-column">
          <div>{`${trans("name")}: ${product.name}`}</div>
          <div>{`${trans("price")}: ${product.price}`}</div>
        </div>
      ),
      responsive: ["xs"],
    },
    {
      key: "xsMenu",
      title: trans("actions"),
      render: (product) => (
        <div className="product-actions-container">
          <Button
            onClick={() => openEditModal(product.id)}
            icon={<EditOutlined />}
            shape={"circle"}
            type={"text"}
            size={"large"}

            // className={"menu-btn"}
          />
          <Button
            onClick={() => deleteData(product.id)}
            icon={<DeleteOutlined />}
            shape={"circle"}
            type={"text"}
            size={"large"}
            // className={"menu-btn"}
          />
        </div>
      ),
      responsive: ["xs"],
    },
    {
      title: trans("name"),
      dataIndex: "name",
      key: "name",
      responsive: ["sm"],
    },
    {
      title: "მაღაზია",
      dataIndex: "shop",
      key: "shop",
      responsive: ["sm"],
    },

    {
      title: trans("category"),
      dataIndex: "category",
      key: "category",
      responsive: ["sm"],
    },
    {
      title: trans("date"),
      dataIndex: "date",
      key: "date",
      responsive: ["sm"],
    },
    {
      title: trans("price"),
      dataIndex: "price",
      key: "price",
      responsive: ["sm"],
    },
    {
      title: trans("quantity"),
      dataIndex: "quantity",
      key: "quantity",
      responsive: ["sm"],
    },
    
    {
      title: trans("is_published"),
      dataIndex: "status",
      key: "status",
      render: (product) => (
        <Switch
          onClick={(v) => {
            toggleStatus(v, product?._id);
          }}
          checked={product?.isPublished}
        />
      ),
      responsive: ["sm"],
    },
    {
      key: "productMenu",
      dataIndex: "",
      title: trans("menu"),
      render: (product) => (
        <div className="product-actions-container">
          <Tooltip title={trans("edit")}>
            <Button
              onClick={() => openEditModal(product.key)}
              icon={<EditOutlined />}
              shape={"circle"}
              type={"text"}
              size={"large"}

              // className={"menu-btn"}
            />
          </Tooltip>
          <Tooltip title={trans("delete")}>
            <Button
              onClick={() => deleteData(product.key)}
              icon={<DeleteOutlined />}
              shape={"circle"}
              type={"text"}
              size={"large"}
              // className={"menu-btn"}
            />
          </Tooltip>
        </div>
      ),
      responsive: ["sm"],
    },
  ];

  return (
    <div className="content-wrapper">
      <div className="table-wrapper">
        <Row className="cars-card-header">
          <Col>
            <h3>{trans("product_list")}</h3>
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
                    key={item._id}
                  >
                    <ProductCard item={item} refresh={getData} openEditModal={openEditModal} />
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
                              <div key={ind} className="card-img ">
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
