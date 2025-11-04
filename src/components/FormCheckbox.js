import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

// Reusable Checkbox Component
const FormCheckbox = ({ 
  label, 
  name, 
  errors, 
  touched,
  ...props 
}) => {
  return (
    <div className="mb-3">
      <div className="form-check">
        <Field
          type="checkbox"
          name={name}
          className={`form-check-input ${
            errors[name] && touched[name] ? 'is-invalid' : ''
          }`}
          id={name}
          {...props}
        />
        <label className="form-check-label" htmlFor={name}>
          {label}
        </label>
        <ErrorMessage name={name} component="div" className="invalid-feedback" />
      </div>
    </div>
  );
};

export default FormCheckbox;
