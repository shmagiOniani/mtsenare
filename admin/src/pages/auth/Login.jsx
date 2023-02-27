import React, { useState, useContext } from "react";
import { Row, Col, Button, Form, Input, message, notification } from "antd"
import API from "../../utils/API"
import { UserContext } from "../../components/contexts/UserContext";
import { TranslationContext } from "../../components/contexts/TranslationContext";
import useTranslation from "../../components/translation/useTranslation";
import "./login.scss";

export default function Login() {
    const context = useContext(UserContext);
    const { trans } = useTranslation();
    const [loading, setLoading] = useState(false)
    const { currentLanguage, setCurrentLanguage } = useContext(TranslationContext);
    const [loginErrors, setLoginErrors] = useState({});
    const languages = [
        { code: "ka", lang: "ქარ" },
        { code: "en", lang: "ENG" },
    ];

    const enter = data => {
        // context.setUser(dataa);
        setLoading(true)

        
        // uncomment 
            API.post(`Security/users/login`, data)
            .then((res) => {
                // window.sessionStorage.setItem("token", res.data.token);
                localStorage.setItem("token", res.data.token);
                window.location.replace("/home")
                context.setUser(res.data.user)
                setLoading(false)
            })
            .catch((err) => {
                notification.error({message: trans(err?.response?.data) || trans("connection_problem"), placement: "bottomLeft"})
                // setLoginErrors(trans("user_not_found"))
                // error()
                setLoading(false)
            });
    };

    const onFinishFailed = (errorInfo) => {
        return errorInfo;
    };

    const error = () => {
        message.error(loginErrors);
      };

    return (
        <Row className="login-wrapper">
            <Col xs={20} md={12} >
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    onFinish={enter}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className="login-form"
                >
                    <Row gutter={[16, 16]} className="login-header">
                        <Col xs={24} md={15}>
                            <h1 >{trans("log_in")}</h1>
                        </Col>
                        <Col xs={24} md={9} className="language-changer">
                            {languages?.map((language, index) => (
                                <Button
                                    key={index}
                                    className={` ${currentLanguage === language.code ? "active" : ""}`}
                                    onClick={() => {
                                        setCurrentLanguage(language.code);
                                        // window.location.reload();
                                    }}
                                >
                                    {language.lang}
                                </Button>
                            ))}
                        </Col>
                    </Row>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: trans("please_submit_username") }]}
                    >

                        <Input placeholder={trans("username")} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: trans("please_submit_password") }]}
                    >
                        <Input.Password placeholder={trans("password")} />
                    </Form.Item>

            
                    
                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                        <Button className="submit-button" loading={loading} type="primary" htmlType="submit">
                            {trans("log_in")}
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}
