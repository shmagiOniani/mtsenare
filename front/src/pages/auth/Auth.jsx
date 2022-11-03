import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  ArrowLeftOutlined,
  LockOutlined,
  UserOutlined,
  MailOutlined,
  MobileOutlined,
} from "@ant-design/icons";

import { Button, Form, Input, Checkbox, InputNumber } from "antd";
import axios from "axios";
// import { useGoogleLogin } from 'react-google-login';
import "./Auth.scss";
import useTransition from "../../hooks/useTranslation";

function Auth() {
  const [signIn, setSignIn] = useState(true);
  let history = useHistory();
  let { trans } = useTransition();
  const clientId =
    "65604429422-o84198pr7i6v18d6fgmui3j88k7gvqtq.apps.googleusercontent.com";

  // const onSuccess = (res) => {
  //   console.log('Login Success: currentUser:', res.profileObj);
  //   alert(
  //     `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
  //   );
  //   // refreshTokenSetup(res);
  // };

  const onFinish = (values) => {
    console.log(values);
    API.post(`/product`, values)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // const onFailure = (res) => {
  //   console.log('Login failed: res:', res);
  //   alert(
  //     `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
  //     );
  //   };
  // const { gooSignIn } = useGoogleLogin({
  //   onSuccess,
  //   onFailure,
  //   clientId,
  //   isSignedIn: true,
  //   accessType: 'offline',
  //   // responseType: 'code',
  //   // prompt: 'consent',
  // });

  const clickEvent1 = () => {
    setSignIn(false);
  };

  const clickEvent2 = () => {
    setSignIn(true);
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="auth-container">
      <div className="go-back">
        <Button onClick={goBack} icon={<ArrowLeftOutlined />} />
        {/* <button  className="button">
      <span className="buttonText">Sign in with Google</span>
    </button> */}
      </div>
      <div className="welcome">
        <div className={`${!signIn ? "swipe-right" : ""} login-wrapper`}>
          <div className={`${signIn ? "nodisplay" : ""}  signup`}>
            <h1>რეგისტრაცია</h1>
            <Form
              name="nest-messages"
              initialValues={{ remember: false }}
              onFinish={onFinish}
            >
              <Form.Item name="userName">
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="მომხმარებელი"
                  label="მომხმარებელი"
                />
              </Form.Item>
              <Form.Item name="email">
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="ელ.ფოსტა"
                  autoComplete="off"
                />
              </Form.Item>
              <Form.Item name="phone">
                <Input
                  prefix={<MobileOutlined className="site-form-item-icon" />}
                  placeholder="მობილური"
                />
              </Form.Item>
              <Form.Item name="password">
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type={"password"}
                  placeholder="პაროლი"
                />
              </Form.Item>
              <Form.Item
                name="re-password"
                rules={[
                  {
                    // required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("არ ემთხვევა!"));
                    },
                  }),
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type={"password"}
                  placeholder="გაიმეორეთ პაროლი"
                />
              </Form.Item>
              <Form.Item>
                <Button className="button" type="primary" htmlType="submit">
                  მომხმარებლის შექმნა
                </Button>
              </Form.Item>
            </Form>

            {/* <form autoComplete="off">
              <input name="name" type="text" placeholder="მომხმარებელი" />
              <input name="email" type="email" placeholder="ელ. ფოსტა" />
              <input name="password" type="text" placeholder="პაროლი" />
              <input
                name="rePassword"
                type="text"
                placeholder="გაიმეორეთ პაროლი"
              />
              <button className="button" type={"submit"}>
                მომხმარებლის შექმნა
              </button>
            </form> */}
          </div>
          <div className={`${!signIn ? "nodisplay" : ""}  signin`}>
            <h1>ავტორიზაცია</h1>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: false }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="მომხმარებელი"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder={trans("password")}
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className="checkbox">Remember me</Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  შესვლა
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="leftbox">
          <button className="button" onClick={clickEvent2} id="signin">
            შესვლა
          </button>
        </div>
        <div className="rightbox">
          <button className="button " onClick={clickEvent1} id="signup">
            განაცხადი
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
