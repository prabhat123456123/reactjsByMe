import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

// Reusable Select Field Component with Dropdown Icon
const FormSelect = ({ 
  label, 
  name, 
  options, 
  placeholder,
  errors, 
  touched,
  ...props 
}) => {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="text-start d-block">
          {label}
        </label>
      )}
      <div className="position-relative">
        <Field
          as="select"
          name={name}
          className={`form-select ${
            errors[name] && touched[name] ? 'is-invalid' : ''
          }`}
          {...props}
        >
          {placeholder && (
            <option value="">{placeholder}</option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
        {/* Bootstrap's dropdown icon is automatically applied with form-select class */}
      </div>
      <ErrorMessage name={name} component="div" className="invalid-feedback" />
    </div>
  );
};

export default FormSelect;