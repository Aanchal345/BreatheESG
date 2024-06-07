import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetLoading } from "../redux/loaderSlice";
import { RegisterUser } from "../apicalls/users";
import { Form, message } from "antd";

const SignUp = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    try {
      if(values.password !== values.confirmPassword){
        message.error("Passwords do not match");
        return;
      }
      const { confirmPassword, ...userData } = values;
      dispatch(SetLoading(true));
      const response = await RegisterUser(userData);
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        navigate("/login");
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
          Sounds interesting? <a href="#"> Get in touch!</a>
        </p>
      </div>
      <div className="formContainer">
        <h2>Sign Up</h2>
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
          <div className="inputGroup">
            <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true, message: 'Please confirm your password!' }]}>
              <input type="password" />
            </Form.Item>
          </div>
          <p className="troubleLink">
            Already have an account? <a href="/login">Login</a>
          </p>
          <button type="submit" className="submitButton">
            Continue
          </button>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
