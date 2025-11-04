import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

// Reusable Radio Group Component
const FormRadioGroup = ({ 
  label, 
  name, 
  options, 
  errors, 
  touched 
}) => {
  return (
    <div className="mb-3">
      <label className="text-start d-block">{label}</label>
      <div>
        {options.map((option) => (
          <div key={option.value} className="form-check form-check-inline">
            <Field
              type="radio"
              name={name}
              value={option.value}
              className="form-check-input"
              id={`${name}${option.value}`}
            />
            <label className="form-check-label" htmlFor={`${name}${option.value}`}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
      <ErrorMessage name={name} component="div" className="text-danger small mt-1" />
    </div>
  );
};

export default FormRadioGroup;
