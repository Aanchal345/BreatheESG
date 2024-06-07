import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetLoading } from "../redux/loaderSlice";
import { LoginUser } from "../apicalls/users";
import { Form, message } from "antd";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    try {
      dispatch(SetLoading(true));
      const response = await LoginUser(values);
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>WELCOME TO</h1>
        <h1 className="brand">BREATHE ESG</h1>
        <p>
          We help you track your organisations metrics as per the ESG Guidelines
        </p>
        <p>
          Sounds Interesting? <a href="#">Get in touch!</a>
        </p>
      </div>
      <div className="formContainer">
        <h2>Login</h2>
        <p>Enter your registered Email ID to continue</p>
        <Form layout="vertical" onFinish={onFinish}>
          <div className="inputGroup">
            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email!' }]}>
              <input type="email" />
            </Form.Item>
          </div>
          <div className="inputGroup">
            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter password!' }]}>
              <input type="password" />
            </Form.Item>
          </div>
          <p className="troubleLink">
            Don't have an account? <a href="/signup">SignUp</a>
          </p>
          <button type="submit" className="submitButton">
            Continue
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
