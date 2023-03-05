import { Button, Card, Carousel, Dropdown, Menu, message, Switch } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import React from "react";
import "./productCard.scss"
import useTranslation from "../translation/useTranslation";
import API from "../../utils/API";

function ProductCard({ item, openEditModal, refresh }) {
  const { trans } = useTranslation();

  const onChange = (a) => {
    return a;
  };

  const deleteData = (id) => {

    API.delete(`/api/products/${id}`)
      .then((res) => message.success(res))
      .finally(() => refresh());
  };

  const menu = (id) => (
    <Menu>
      <Menu.Item>
        <Button
          onClick={() => openEditModal(true)}
          icon={<EditOutlined />}
          className={"menu-btn"}
          type={"text"}
        >
          {trans("edit")}
        </Button>
      </Menu.Item>
     
      <Menu.Item>
        <Button
          onClick={() => deleteData(id)}
          icon={<DeleteOutlined />}
          className={"menu-btn"}
          type={"text"}
        >
          {trans("delete")}
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      title={
        <div className="card-title">
          <p>{item?.name}</p>
          <Dropdown overlay={menu(item._id)} trigger={["click"]}>
            <Button type="text" shape="circle" icon={<MoreOutlined />} size={"large"} />
          </Dropdown>
        </div>
      }
    >
      <div className="card-content">
        <Carousel afterChange={onChange}>
          {item.images?.map((photo, ind) => {
            return (
              <div key={ind} className="card-img ">
                <img
                  alt="pti-img"
                  width={150}
                  src={`http://localhost:4002/${photo}`}
                />
              </div>
            );
          })}
        </Carousel>
      </div>
      <div className="card-footer">
        <div>
          {/* <span>ატვირთულია:</span> */}
          <p>{moment(item?.nextExecutionDate).format("L, H:mm")}</p>
        </div>
        <div style={{ display: "flex" }}>
          <div>ფასი: </div>
          <div>{item.price}</div>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <Switch
            onClick={(v) => {
              // changeStatus(v, item?.id);
            }}
            // eslint-disable-next-line eqeqeq
            checked={item?.isPublished}
          />
        </div>
      </div>
    </Card>
  );
}

export default ProductCard;
