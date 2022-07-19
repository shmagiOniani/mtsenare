import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber } from "antd";
import axios from "axios";
// import { useGoogleLogin } from 'react-google-login';
import "./Auth.scss";



function Auth() {
  const [signIn, setSignIn] = useState(true);
  let history = useHistory();
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
    axios.get(`http://localhost:4002/api/users/sign-up`, { values })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
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
        <div className={`${!signIn ? "swipe-right" : ""} pinkbox`}>
          <div className={`${signIn ? "nodisplay" : ""}  signup`}>
            <h1>რეგისტრაცია</h1>

            <Form
              name="nest-messages"
              onFinish={onFinish}
            >
              <Form.Item
                name="userName"
              >
                <Input placeholder="მომხმარებელი" />
              </Form.Item>
              <Form.Item
                name="email"
              >
                <Input placeholder="ელ.ფოსტა"autoComplete='off' />
              </Form.Item>
              <Form.Item name="phone" >
                <Input placeholder="მობილური" />
              </Form.Item>
              <Form.Item name="password" >
                <Input type={"password"} placeholder="პაროლი" />
              </Form.Item>
              <Form.Item name="re-password"
               rules={[
                {
                  // required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('არ ემთხვევა!'));
                  },
                }),
              ]} >
                <Input type={"password"} placeholder="გაიმეორეთ პაროლი" />
              </Form.Item>
              <Form.Item >
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
            <form className="more-padding" autoComplete="off">
              <input type="text" placeholder="მომხმარებელი" />
              <input type="text" placeholder="პაროლი" />
              <div className="checkbox">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">დამახსოვრება</label>
              </div>

              <button className="button ">შესვლა</button>
            </form>
          </div>
        </div>
        <div className="leftbox">
          <h2 className="title">
            <span>BLOOM</span>&<br />
            BOUQUET
          </h2>
          <p className="desc">
            აირჩიეთ თქვენი ფავორითი <span>თაიგული</span>
          </p>
          <img
            className="flower smaller"
            src="https://image.ibb.co/d5X6pn/1357d638624297b.jpg"
            alt="1357d638624297b"
            border="0"
          />
          <p className="account">გაქვთ ანგარიში?</p>
          <button className="button" onClick={clickEvent2} id="signin">
            შესვლა
          </button>
        </div>
        <div className="rightbox">
          <h2 className="title">
            <span>BLOOM</span>&<br />
            BOUQUET
          </h2>
          <p className="desc">
            აირჩიეთ თქვენი ფავორითი<span>თაიგული</span>
          </p>
          <img
            className="flower"
            src="https://preview.ibb.co/jvu2Un/0057c1c1bab51a0.jpg"
          />
          <p className="account">არ გაქვთ ანგარიში?</p>
          <button className="button " onClick={clickEvent1} id="signup">
            განაცხადი
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
