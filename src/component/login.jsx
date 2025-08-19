import React from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../api/service";
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

const LoginComp = () => {
  const navigate = useNavigate();


  const onFinish = async(values) => {
   const response = await login(values)
   console.log(response);
   if(response.session_code){
   localStorage.setItem("Session_Code", response.session_code)
   navigate('/admin');
  
  }

   else{
    localStorage.clear();
   }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(to right, #74ebd5, #ACB6E5)"
    }}>
      <Card style={{
        width: 350,
        padding: "20px 10px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 30 }}>
          Login
        </Title>
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: "100%", borderRadius: "6px" }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginComp;
