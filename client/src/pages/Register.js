import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import {Link} from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import css from "../resources/authentication.css";
import axios from 'axios';
import Spinner from "../components/Spinner";

function Register() {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(true);

    const onFinish = async (values) => {
      try {
          setLoading(true);
          await axios.post('/api/users/register', values )
          message.success("Registration Successful");
          setLoading(false);
      }
      catch(error) {
          message.error("Something went wrong");
          setLoading(false);
      }
        
    }

    return (
    <div className="register">
      {loading && <Spinner />}

      <div className="gradient-x row justify-content-center align-items-center ">
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
        <div className="col-md-5">
          <h1>Expense Tracker Register</h1>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input />
            </Form.Item>

            <div className="d-flex justify-content-between ">
              <Link to="/login">Already Registered, click here to Login</Link>
              <button className="primary" type="submit">Register</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
