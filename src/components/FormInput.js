import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

// Reusable Form Input Component
const FormInput = ({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  errors, 
  touched,
  as = 'input',
  children,
  ...props 
}) => {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="text-start d-block">
          {label}
        </label>
      )}
      <Field
        type={type}
        name={name}
        as={as}
        className={`form-control ${
          errors[name] && touched[name] ? 'is-invalid' : ''
        }`}
        placeholder={placeholder}
        {...props}
      >
        {children}
      </Field>
      <ErrorMessage name={name} component="div" className="invalid-feedback" />
    </div>
  );
};


export default FormInput;