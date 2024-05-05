import { useFormik } from "formik";
import * as Yup from "yup";
import Astro_2 from "../assets/images/astro_2.png";
import { Box, Button, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Header from "../components/header";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import CustomSnakbar from "../components/snakbar";
import { Backend_URL } from "../config/constants";

// FORMIK
const INITIAL_FORM_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

//YUP
const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("Please fill first name!"),
  lastName: Yup.string().required("Please fill last name!"),
  email: Yup.string().required("Please fill email!"),
  password: Yup.string().required("Please fill password!"),
  confirmPassword: Yup.string().required("Please fill password!"),
});

function SignUp() {
  const Navigate = useNavigate();

  //! States
  const [loading, setLoading] = useState(false);

  //! Snackbar
  const [open, setOpen] = useState(false);
  const handleCloseSnakBar = () => {
    setOpen(false);
  };

  //! Form ----->
  const { values, handleBlur, handleChange, handleSubmit, errors, resetForm } =
    useFormik({
      initialValues: INITIAL_FORM_VALUES,
      validationSchema: FORM_VALIDATION,
      onSubmit: (values) => {
        setLoading(true);
        axios
          .post(`${Backend_URL}/auth/register`, values)
          .then((res) => {
            setOpen(true);
            setLoading(false);
            resetForm();
            setTimeout(() => {
              Navigate("/login");
            }, 2000);
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
            resetForm();
          });
      },
    });

  //! Rendering HTML -----------------------------------------------------------
  return (
    <>
      <Header />
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "90vh",
        }}
      >
        <div
          className="d-flex"
          style={{
            minHeight: "40vh",
            width: "55%",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
            border: "1px solid black",
          }}
        >
          <div className="col custom-row">
            <img src={Astro_2} alt="nasa" className="img-fluid" />
          </div>
          <div className="col">
            <h3 className="mt-5">SignUp</h3>
            <form onSubmit={handleSubmit} className="mt-5">
              <div>
                <TextField
                  id="outlined-error-helper-text"
                  name="firstName"
                  label="First Name"
                  size="small"
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.firstName}
                />
                {errors.firstName && (
                  <small>
                    <p className="text-danger">{errors.firstName}</p>
                  </small>
                )}
              </div>
              <div className="mt-3">
                <TextField
                  id="outlined-error-helper-text"
                  name="lastName"
                  label="Last Name"
                  size="small"
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.lastName}
                />
                {errors.lastName && (
                  <small>
                    <p className="text-danger">{errors.lastName}</p>
                  </small>
                )}
              </div>
              <div className="mt-3">
                <TextField
                  id="outlined-error-helper-text"
                  name="email"
                  label="E-mail"
                  size="small"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.email}
                />
                {errors.email && (
                  <small>
                    <p className="text-danger">{errors.email}</p>
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
              <div className="mt-3">
                <TextField
                  id="outlined-error-helper-text"
                  name="confirmPassword"
                  label="Confirm Password"
                  size="small"
                  value={values.confirmPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                />
                {errors.confirmPassword && (
                  <small>
                    <p className="text-danger">{errors.confirmPassword}</p>
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
                <span>Signup</span>
              </LoadingButton>
            </form>
          </div>
        </div>
      </div>
      //! Snackbar
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleCloseSnakBar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnakBar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          You have successfully registered! Please login to continue.
        </Alert>
      </Snackbar>
    </>
  );
}

export default SignUp;
