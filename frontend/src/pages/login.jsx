import { Box, Button, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Astro_2 from "../assets/images/astro_2.png";
import "../css/login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { Backend_URL } from "../config/constants";

// FORMIK
const INITIAL_FORM_VALUES = {
  username: "",
  password: "",
};

//YUP
const FORM_VALIDATION = Yup.object().shape({
  username: Yup.string().required("Please fill username!"),
  password: Yup.string().required("Please fill password!"),
});

function Login() {
  const Navigate = useNavigate();

  //! States
  const [loading, setLoading] = useState(false);

  //! Form ----->
  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: INITIAL_FORM_VALUES,
    validationSchema: FORM_VALIDATION,
    onSubmit: (values) => {
      setLoading(true);
      const loginObject = {
        email: values.username,
        password: values.password,
      };
      axios
        .post(`${Backend_URL}/auth/login`, loginObject)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userName", res.data.userName);
          setLoading(false);
          Navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    },
  });

  //! Rendering HTML
  return (
    <>
      <Header />
      <div
        className="d-flex justify-content-center align-items-center "
        style={{
          minHeight: "90vh",
          width: "100%",
        }}
      >
        <div
          className="d-flex p-4"
          style={{ boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)", width: "45%" }}
        >
          <div className="col custom-row">
            <img src={Astro_2} alt="nasa" className="img-fluid" />
          </div>
          <div className="col custom-row">
            <h3 className="mt-5">Login</h3>
            <form onSubmit={handleSubmit} className="mt-5">
              <div>
                <TextField
                  id="outlined-error-helper-text"
                  name="username"
                  label="Username"
                  size="small"
                  value={values.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.username}
                />
                {errors.username && (
                  <small>
                    <p className="text-danger">{errors.username}</p>
                  </small>
                )}
              </div>
              <div className="mt-3">
                <TextField
                  id="outlined-error-helper-text"
                  name="password"
                  label="Password"
                  size="small"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.password}
                />
                {errors.password && (
                  <small>
                    <p className="text-danger">{errors.password}</p>
                  </small>
                )}
              </div>
              <LoadingButton
                size="small"
                type="submit"
                endIcon={<SendIcon />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                className="mt-5 mb-3"
              >
                <span>Login</span>
              </LoadingButton>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
