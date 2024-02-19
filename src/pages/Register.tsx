import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";

import logoImg from "@assets/images/logo_image.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Login {
  username?: string;
  password?: string;
  remember?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [checkNick, setCheckNick] = useState(false);
  const onCheckboxChange = (e: { target: { checked: boolean } }) => {
    setCheckNick(e.target.checked);
  };
  const onFinish = (value: Login) => {
    console.log("Received values of form: ", value);
    console.log("helloing");
    navigate("/home");
  };
  return (
    <div className="login-container">
      <div>
        <img src={logoImg} />
        <h2>Sign Up</h2>
        <p>Welcome !! Please enter your details below to sign up.</p>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            placeholder="Username"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            placeholder="Email"
            type="email"
            prefix={<MessageOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            type="password"
            placeholder="Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please input your Confirm Password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input
            type="password"
            placeholder="Confirm Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item>
          <Checkbox checked={checkNick} onChange={onCheckboxChange}>
            Remember me?
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="button-container btn-green">
            Register
          </Button>
        </Form.Item>
        <p>
          Already have an account?
          <a href="/login" className="signup">
            Sign In
          </a>
        </p>
      </Form>
    </div>
  );
}
