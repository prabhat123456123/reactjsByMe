// components/RegisterForm.jsx
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import { register, clearError } from "../store/slices/authSlice";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // ✅ Validation Schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  // ✅ Initial Values
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // ✅ Submit Handler
  const handleSubmit = (values) => {
    const { confirmPassword, ...registerData } = values;
    dispatch(register(registerData));
  };

  return (
    <div className="auth-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ touched, errors }) => (
          <Form className="auth-form">
            <h2>Create Your Account</h2>

            <div className="mb-3">
              <label htmlFor="name" className="form-label text-start d-block">
                Full Name
              </label>
              <Field
                name="name"
                type="text"
                className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
                placeholder="Enter your full name"
                disabled={loading}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label text-start d-block">
                Email Address
              </label>
              <Field
                name="email"
                type="email"
                className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                placeholder="Enter your email"
                disabled={loading}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label text-start d-block">
                Password
              </label>
              <Field
                name="password"
                type="password"
                className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                placeholder="Create a password"
                disabled={loading}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label text-start d-block">
                Confirm Password
              </label>
              <Field
                name="confirmPassword"
                type="password"
                className={`form-control ${
                  touched.confirmPassword && errors.confirmPassword ? "is-invalid" : ""
                }`}
                placeholder="Confirm your password"
                disabled={loading}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="invalid-feedback"
              />
            </div>

            {error && (
              <div className="alert alert-danger text-center py-2">{error}</div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

            <p className="auth-link mt-3 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-none">
                Login here
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
