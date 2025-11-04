// components/LoginForm.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login, clearError } from "../store/slices/authSlice";
import { Button, Form as BootstrapForm, Spinner } from "react-bootstrap";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
console.log(loading, error, isAuthenticated);

  // Redirect when logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Formik initial values
  const initialValues = {
    email: "",
    password: "",
  };

  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Form submit
  const handleSubmit = (values) => {
    dispatch(clearError());
    dispatch(login(values));
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Login to Your Account</h3>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label className="text-start d-block">
                  Email Address
                </BootstrapForm.Label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  disabled={loading}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger small mt-1"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group className="mb-3">
                <BootstrapForm.Label className="text-start d-block">
                  Password
                </BootstrapForm.Label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger small mt-1"
                />
              </BootstrapForm.Group>

              {error && (
                <div className="alert alert-danger py-2 text-center">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-100"
                disabled={loading || isSubmitting}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Login"}
              </Button>

              <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link to="/register" className="text-decoration-none">
                  Register here
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
