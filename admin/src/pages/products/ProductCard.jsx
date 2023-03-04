import { Card, Carousel, Switch } from "antd";
import moment from "moment";
import React from "react";

function ProductCard({ item }) {
  const onChange = (a) => {
    return a;
  };

  const photosInst = [
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  ];

  return (
    <Card
      title={
        <div className="card-title">
          <p>{item?.name}</p>
        </div>
      }
    >
      <div className="card-content">
        <Carousel afterChange={onChange}>
          {item.images?.map((photo, ind) => {
            return (
              <div key={ind} className="car-img">
                <img alt="pti-img" width={150} src={`http://localhost:4002/${photo}`} />
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
        <div>
          <span>ნახვები</span>
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
  );
}

export default ProductCard;
