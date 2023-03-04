import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, Input, Avatar, notification, message } from "antd";
import { UserOutlined, BankOutlined, CaretUpOutlined } from "@ant-design/icons";
import { UserContext } from "../contexts/UserContext";
import useTranslation from "../translation/useTranslation";
import moment from "moment";
import API from "../../utils/API";
import { variables } from "../../utils/utils";
import "./chat.scss";

import io from "socket.io-client";

function Chat(props) {
  const { TextArea } = Input;
  const { trans } = useTranslation();
  const { hasPermissions } = useContext(UserContext);
  const socketRef = useRef();
  const context = useContext(UserContext);
  const [isLogoActive, setLogoActive] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const [state, setState] = useState({ text: "", name: "" });
  const [chat, setChat] = useState([]);
  const [branch, setBranch] = useState("");
  const [userObj, setUserObj] = useState({});

  let today = new Date();
  let time = `${today.getHours()}: ${today.getMinutes()}`;

  let hours =
    JSON.stringify(moment().hours())?.length === 1
      ? `0${moment().hours()}`
      : moment().hours();
  let minutes = moment().minutes();
  let currentDate = `${moment(today)
    .month(today.getMonth())
    .format("YYYY-MM-DD")} ${hours}:${minutes}`;

  const getBranch = (id) => {
    // if (hasPermissions("Permissions.Branch")) {
    //   API.get(`/get-requests-handler`, {
    //     params: { url: `/Company/branches/${id}`, params: {} },
    //   })
    //     .then((res) => {
    //       if (res.data.name === "Error") {
    //         message.error(res.data);
    //       } else {
    //         setBranch(res.data);
    //       }
    //     })
    //     .catch((err) => err);
    // }
  };

  const getUser = (id) => {
    // API.get(`check-me`, {params:{token: localStorage.getItem("token")}})
    // .then((res) => setUserObj(res.data))
    // .catch((err) => notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"}));
  };

  const onScroll = (e) => setLogoActive(e.target.scrollTop < 100);

  const onTextChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
      name: context.user.username,
    });
  };

  const onFinish = (e) => {
    const { name, text } = state;
    // API.post(`/post-requests-handler`, {
    //   url: `/Chat/messages`,
    //   params: {},
    //   data: {
    //     text,
    //     user: userObj.username,
    //     branch: branch.name,
    //     timestamp: `${currentDate}`,
    //   },
    // })
    //   .then((res) => console.log(res))
    //   .catch((err) => message.error(err?.response?.data));

    // e.preventDefault();
    // setState({ text: "", name });
  };

  const renderChat = () => {
    return chat?.map(({ user, text, branch, timestamp }, index) => (
      <div key={index} className={`chat-item ${user === userObj.username}`}>
        <div className="user-name">
          <Avatar size={50} icon={<UserOutlined />} />
          <div>{user}</div>
        </div>
        <div className="notification-container">
          <p>{text}</p>
        </div>
        <div className="date-filial">
          <div className="filial">
            <BankOutlined />
            {branch}
          </div>
          <div className="date">{`${timestamp?.slice(
            0,
            10
          )} / ${timestamp?.slice(11, 16)}`}</div>
        </div>
      </div>
    ));
  };

  const getMessages = (page, count) => {
    // API.get(`/get-requests-handler`, {
    //   params: { url: `/Chat/messages`, params: { Page: page, Count: count } },
    // })
    //   .then((res) => {
    //     if (res.data.name === "Error") {
    //       message.error(res.data);
    //     } else {
    //       setChat([...chat, ...res.data.data]);
    //     }
    //   })
    //   .catch((err) => message.error(err?.response?.data.title));
  };

  const handleLoadMore = () => {
    getMessages(currentPage, 10);
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getUser(context.user.id);
    getBranch(context.user.branchId);
    handleLoadMore();
  }, []);

  useEffect(() => {
    socketRef.current = io.connect(variables.production.BASE_API);
    socketRef.current.on("message", ({ text, user, branch, timestamp }) => {
      setChat([{ text, user, branch, timestamp }, ...chat]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);
  // onBlur={props.handleClose}
  return (
    <div className="chat-body">
      <div className="chat-wrapper ">
        <div className="chat-header">
          <div> {trans("notifications")} </div>
          <div> {props.children} </div>
        </div>
        <div onScroll={onScroll} id="container" className="chat-container">
          {renderChat()}
          <div onClick={handleLoadMore} className="load-more">
            <CaretUpOutlined />
            <span>+10</span>
          </div>
        </div>
        <div className="notification-input">
          <form onSubmit={onFinish}>
            <TextArea
              onKeyPress={(board) =>
                board.key === "Enter" ? onFinish(board) : ""
              }
              onChange={(e) => onTextChange(e)}
              name="text"
              rows={3}
              value={state.text}
            />
            <Button className="focus-white" htmlType="submit" type={"primary"}>
              {trans("submit")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
