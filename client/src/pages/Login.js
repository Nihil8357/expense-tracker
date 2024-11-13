import React,{useEffect, useState} from "react";
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import {Link, useNavigate} from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import css from "../resources/authentication.css";
import axios from 'axios';
import Spinner from "../components/Spinner";

function Login() {

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values) => {
        
    try {
          setLoading(true);
          const response = await axios.post('/api/users/login', values )
          message.success("Login Successful");
          setLoading(false);
          localStorage.setItem('expense-tracker-user', JSON.stringify({...response.data, password: ''}))
          navigate("/")
      }
      catch(error) {
          message.error("Login went wrong");
          setLoading(false);
      }
    }

    useEffect(() => {
        if(localStorage.getItem('expense-tracker-user')) {
          navigate("/");
        }
    }, [])

    return (
    <div className="register">
      
      {loading && <Spinner />}

      <div className="gradient-x row justify-content-center align-items-center ">
        
        <div className="col-md-5">
          <h1>Expense Tracker Login</h1>

          <Form layout="vertical" onFinish={onFinish}>

            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input />
            </Form.Item>

            <div className="d-flex justify-content-between align ">
              <Link to="/register">Not Registered, Click here to register</Link>
              <button className="primary" type="submit">Login</button>
            </div>
          </Form>
        </div>

        <div className="col-md-5">
          <div className="lottie">
            <DotLottieReact
              src="https://lottie.host/316be703-f8b7-47b1-930a-b91b3f2e667f/aMjvxUjLMh.json"
              background="transparent"
              speed="1"
              loop
              className="lottie"
              autoplay
            ></DotLottieReact>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
