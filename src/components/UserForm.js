import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, Button, Alert, Nav, Tab } from 'react-bootstrap';

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

// Reusable Select Field Component
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
      <ErrorMessage name={name} component="div" className="invalid-feedback" />
    </div>
  );
};

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

// Reusable Form Row Component
const FormRow = ({ children }) => {
  return <Row>{children}</Row>;
};

// Reusable Form Column Component
const FormCol = ({ children, xs = 12, sm = 6, md = 3, lg = 3, xl = 3, ...props }) => {
  return (
    <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl} {...props}>
      {children}
    </Col>
  );
};

// Validation schemas for each tab
const personalInfoSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .required('Phone number is required'),
  gender: Yup.string()
    .required('Gender is required')
});

const addressInfoSchema = Yup.object({
  address: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .required('Address is required'),
  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .required('City is required'),
  state: Yup.string()
    .required('State is required'),
  zipCode: Yup.string()
    .matches(/^[0-9]+$/, 'Zip code must contain only digits')
    .min(5, 'Zip code must be at least 5 digits')
    .required('Zip code is required'),
  country: Yup.string()
    .required('Country is required')
});

const accountInfoSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
});

// Combined validation schema for final submission
const completeValidationSchema = Yup.object().shape({
  ...personalInfoSchema.fields,
  ...addressInfoSchema.fields,
  ...accountInfoSchema.fields
});

// Custom hook for form state management
const useFormState = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [completedTabs, setCompletedTabs] = useState([]);
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Effect to hide error message when all errors are fixed
  useEffect(() => {
    if (showAllErrors && Object.keys(formErrors).length === 0) {
      setShowAllErrors(false);
    }
  }, [formErrors, showAllErrors]);

  return {
    activeTab,
    setActiveTab,
    completedTabs,
    setCompletedTabs,
    showAllErrors,
    setShowAllErrors,
    formErrors,
    setFormErrors
  };
};

// Main form component
const MultiTabForm = () => {
  const {
    activeTab,
    setActiveTab,
    completedTabs,
    setCompletedTabs,
    showAllErrors,
    setShowAllErrors,
    formErrors,
    setFormErrors
  } = useFormState();

  const initialValues = {
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    
    // Address Info
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Account Info
    username: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  };

  // Options for dropdowns
  const countryOptions = [
    { value: '', label: 'Select Country' },
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' }
  ];

  const stateOptions = [
    { value: '', label: 'Select State' },
    { value: 'CA', label: 'California' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' },
    { value: 'FL', label: 'Florida' }
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const getValidationSchema = (tab) => {
    switch (tab) {
      case 'personal':
        return personalInfoSchema;
      case 'address':
        return addressInfoSchema;
      case 'account':
        return accountInfoSchema;
      default:
        return Yup.object();
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Validate ALL tabs before submission
      await completeValidationSchema.validate(values, { abortEarly: false });
      
      // If validation passes, clear all errors and hide error message
      setFormErrors({});
      setShowAllErrors(false);
      
      console.log('Form values:', values);
      
      // Simulate API call
      setTimeout(() => {
        alert('Form submitted successfully!');
        setSubmitting(false);
        resetForm();
        setActiveTab('personal');
        setCompletedTabs([]);
      }, 1000);
      
    } catch (validationErrors) {
      // Show all errors from all tabs
      const errors = {};
      validationErrors.inner.forEach(error => {
        errors[error.path] = error.message;
      });
      
      setFormErrors(errors);
      setShowAllErrors(true);
      setSubmitting(false);
      
      // Navigate to the first tab with errors
      const errorFields = Object.keys(errors);
      if (errorFields.some(field => ['firstName', 'lastName', 'email', 'phone', 'gender'].includes(field))) {
        setActiveTab('personal');
      } else if (errorFields.some(field => ['address', 'city', 'state', 'zipCode', 'country'].includes(field))) {
        setActiveTab('address');
      } else {
        setActiveTab('account');
      }
    }
  };

  const handleTabClick = (tab, formik) => {
    // Allow direct tab switching without validation
    setActiveTab(tab);
    
    // Mark tab as completed if it has values (optional)
    const tabFields = {
      personal: ['firstName', 'lastName', 'email', 'phone', 'gender'],
      address: ['address', 'city', 'state', 'zipCode', 'country'],
      account: ['username', 'password', 'confirmPassword', 'agreeToTerms']
    };
    
    const currentTabFields = tabFields[tab];
    const hasValues = currentTabFields.some(field => formik.values[field]);
    
    if (hasValues && !completedTabs.includes(tab)) {
      setCompletedTabs([...completedTabs, tab]);
    }
  };

  const handleNextButton = async (nextTab, formik) => {
    // Validate current tab before proceeding to next
    const currentTabSchema = getValidationSchema(activeTab);
    
    try {
      await currentTabSchema.validate(formik.values, { abortEarly: false });
      // No errors - proceed to next tab
      setActiveTab(nextTab);
      if (!completedTabs.includes(activeTab)) {
        setCompletedTabs([...completedTabs, activeTab]);
      }
    } catch (validationErrors) {
      // Show errors for current tab
      const errors = {};
      validationErrors.inner.forEach(error => {
        errors[error.path] = error.message;
      });
      formik.setErrors(errors);
      
      // Mark fields as touched to show errors
      const touchedFields = {};
      Object.keys(currentTabSchema.fields).forEach(field => {
        touchedFields[field] = true;
      });
      formik.setTouched(touchedFields);
    }
  };

  const isTabComplete = (tabName) => completedTabs.includes(tabName);

  const hasTabErrors = (tabName) => {
    const tabFields = {
      personal: ['firstName', 'lastName', 'email', 'phone', 'gender'],
      address: ['address', 'city', 'state', 'zipCode', 'country'],
      account: ['username', 'password', 'confirmPassword', 'agreeToTerms']
    };
    
    return tabFields[tabName].some(field => formErrors[field]);
  };

  const getTabClassName = (tabName) => {
    if (isTabComplete(tabName) && !hasTabErrors(tabName)) {
      return 'text-success';
    }
    if (showAllErrors && hasTabErrors(tabName)) {
      return 'text-danger';
    }
    return '';
  };

  const isTabValid = (tabName, formik) => {
    const tabFields = {
      personal: ['firstName', 'lastName', 'email', 'phone', 'gender'],
      address: ['address', 'city', 'state', 'zipCode', 'country'],
      account: ['username', 'password', 'confirmPassword', 'agreeToTerms']
    };
    
    const fields = tabFields[tabName];
    return !fields.some(field => formik.errors[field]);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card>
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">Multi-Step Registration Form</h3>
              <small className="d-block mt-1">Click any tab to navigate freely. All tabs will be validated on final submission.</small>
            </Card.Header>
            <Card.Body>
              <Formik
                initialValues={initialValues}
                validationSchema={getValidationSchema(activeTab)}
                onSubmit={handleSubmit}
                validateOnChange={true}
                validateOnBlur={true}
              >
                {(formik) => {
                  // Update form errors when Formik errors change
                  if (JSON.stringify(formik.errors) !== JSON.stringify(formErrors)) {
                    setFormErrors(formik.errors);
                  }

                  return (
                    <Form>
                      <Tab.Container activeKey={activeTab}>
                        {/* Navigation Tabs */}
                        <Nav variant="tabs" className="mb-4">
                          <Nav.Item>
                            <Nav.Link 
                              eventKey="personal" 
                              className={getTabClassName('personal')}
                              onClick={(e) => {
                                e.preventDefault();
                                handleTabClick('personal', formik);
                              }}
                            >
                              <i className={`bi ${
                                isTabComplete('personal') && !hasTabErrors('personal') ? 'bi-check-circle-fill' : 
                                isTabValid('personal', formik) ? 'bi-1-circle-fill' : 'bi-1-circle'
                              } me-2`}></i>
                              Personal Info
                              {showAllErrors && hasTabErrors('personal') && <span className="ms-2">*</span>}
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link 
                              eventKey="address" 
                              className={getTabClassName('address')}
                              onClick={(e) => {
                                e.preventDefault();
                                handleTabClick('address', formik);
                              }}
                            >
                              <i className={`bi ${
                                isTabComplete('address') && !hasTabErrors('address') ? 'bi-check-circle-fill' : 
                                isTabValid('address', formik) ? 'bi-2-circle-fill' : 'bi-2-circle'
                              } me-2`}></i>
                              Address Info
                              {showAllErrors && hasTabErrors('address') && <span className="ms-2">*</span>}
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link 
                              eventKey="account"
                              className={getTabClassName('account')}
                              onClick={(e) => {
                                e.preventDefault();
                                handleTabClick('account', formik);
                              }}
                            >
                              <i className={`bi ${
                                isTabComplete('account') && !hasTabErrors('account') ? 'bi-check-circle-fill' : 
                                isTabValid('account', formik) ? 'bi-3-circle-fill' : 'bi-3-circle'
                              } me-2`}></i>
                              Account Info
                              {showAllErrors && hasTabErrors('account') && <span className="ms-2">*</span>}
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>

                        {/* Tab Content */}
                        <Tab.Content>
                          {/* Personal Info Tab */}
                          <Tab.Pane eventKey="personal">
                            <h5 className="mb-4">Personal Information</h5>
                            
                            {showAllErrors && hasTabErrors('personal') && (
                              <Alert variant="danger" className="mb-3">
                                <strong>Please fix the errors in this tab before submitting:</strong>
                              </Alert>
                            )}
                            
                            <FormRow>
                              <FormCol md={6}>
                                <FormInput
                                  label="First Name"
                                  name="firstName"
                                  type="text"
                                  placeholder="Enter first name"
                                  errors={formik.errors}
                                  touched={showAllErrors ? { firstName: true } : formik.touched}
                                />
                              </FormCol>
                              <FormCol md={6}>
                                <FormInput
                                  label="Last Name"
                                  name="lastName"
                                  type="text"
                                  placeholder="Enter last name"
                                  errors={formik.errors}
                                  touched={showAllErrors ? { lastName: true } : formik.touched}
                                />
                              </FormCol>
                            </FormRow>

                            <FormRow>
                              <FormCol md={6}>
                                <FormInput
                                  label="Email Address"
                                  name="email"
                                  type="email"
                                  placeholder="Enter email"
                                  errors={formik.errors}
                                  touched={showAllErrors ? { email: true } : formik.touched}
                                />
                              </FormCol>
                              <FormCol md={6}>
                                <FormInput
                                  label="Phone Number"
                                  name="phone"
                                  type="text"
                                  placeholder="Enter phone number"
                                  errors={formik.errors}
                                  touched={showAllErrors ? { phone: true } : formik.touched}
                                />
                              </FormCol>
                            </FormRow>

                            <FormRadioGroup
                              label="Gender"
                              name="gender"
                              options={genderOptions}
                              errors={formik.errors}
                              touched={showAllErrors ? { gender: true } : formik.touched}
                            />

                            <div className="d-flex justify-content-between mt-4">
                              <div></div>
                              <Button 
                                variant="primary" 
                                onClick={() => handleNextButton('address', formik)}
                              >
                                Next: Address Info <i className="bi bi-arrow-right ms-2"></i>
                              </Button>
                            </div>
                          </Tab.Pane>

                          {/* Address Info Tab */}
                          <Tab.Pane eventKey="address">
                            <h5 className="mb-4">Address Information</h5>
                            
                            {showAllErrors && hasTabErrors('address') && (
                              <Alert variant="danger" className="mb-3">
                                <strong>Please fix the errors in this tab before submitting:</strong>
                              </Alert>
                            )}
                            
                            <FormInput
                              label="Street Address"
                              name="address"
                              type="text"
                              placeholder="Enter street address"
                              errors={formik.errors}
                              touched={showAllErrors ? { address: true } : formik.touched}
                            />

                            <FormRow>
                              <FormCol md={6}>
                                <FormInput
                                  label="City"
                                  name="city"
                                  type="text"
                                  placeholder="Enter city"
                                  errors={formik.errors}
                                  touched={showAllErrors ? { city: true } : formik.touched}
                                />
                              </FormCol>
                              <FormCol md={6}>
                                <FormSelect
                                  label="State"
                                  name="state"
                                  options={stateOptions}
                                  placeholder="Select your state"
                                  errors={formik.errors}
                                  touched={showAllErrors ? { state: true } : formik.touched}
                                />
                              </FormCol>
                            </FormRow>

                            <FormRow>
                              <FormCol md={6}>
                                <FormInput
                                  label="Zip Code"
                                  name="zipCode"
                                  type="text"
                                  placeholder="Enter zip code"
                                  errors={formik.errors}
                                  touched={showAllErrors ? { zipCode: true } : formik.touched}
                                />
                              </FormCol>
                              <FormCol md={6}>
                                <FormSelect
                                  label="Country"
                                  name="country"
                                  options={countryOptions}
                                  placeholder="Select your country"
                                  errors={formik.errors}
                                  touched={showAllErrors ? { country: true } : formik.touched}
                                />
                              </FormCol>
                            </FormRow>

                            <div className="d-flex justify-content-between mt-4">
                              <Button 
                                variant="outline-secondary" 
                                onClick={() => handleTabClick('personal', formik)}
                              >
                                <i className="bi bi-arrow-left me-2"></i>Back to Personal
                              </Button>
                              <Button 
                                variant="primary" 
                                onClick={() => handleNextButton('account', formik)}
                              >
                                Next: Account Info <i className="bi bi-arrow-right ms-2"></i>
                              </Button>
                            </div>
                          </Tab.Pane>

                          {/* Account Info Tab */}
                          <Tab.Pane eventKey="account">
                            <h5 className="mb-4">Account Information</h5>
                            
                            {showAllErrors && (hasTabErrors('personal') || hasTabErrors('address') || hasTabErrors('account')) && (
                              <Alert variant="danger" className="mb-3">
                                <strong>Please fix all errors in all tabs before submitting:</strong>
                                <div className="mt-2">
                                  {hasTabErrors('personal') && <div>• Personal Information tab has errors</div>}
                                  {hasTabErrors('address') && <div>• Address Information tab has errors</div>}
                                  {hasTabErrors('account') && <div>• Account Information tab has errors</div>}
                                </div>
                              </Alert>
                            )}
                            
                            <FormInput
                              label="Username"
                              name="username"
                              type="text"
                              placeholder="Enter username"
                              errors={formik.errors}
                              touched={showAllErrors ? { username: true } : formik.touched}
                            />

                            <FormRow>
                              <FormCol md={6}>
                                <FormInput
                                  label="Password"
                                  name="password"
                                  type="password"
                                  placeholder="Enter password"
                                  errors={formik.errors}
                                  touched={showAllErrors ? { password: true } : formik.touched}
                                />
                              </FormCol>
                              <FormCol md={6}>
                                <FormInput
                                  label="Confirm Password"
                                  name="confirmPassword"
                                  type="password"
                                  placeholder="Confirm password"
                                  errors={formik.errors}
                                  touched={showAllErrors ? { confirmPassword: true } : formik.touched}
                                />
                              </FormCol>
                            </FormRow>

                            <FormCheckbox
                              label="I agree to the terms and conditions"
                              name="agreeToTerms"
                              errors={formik.errors}
                              touched={showAllErrors ? { agreeToTerms: true } : formik.touched}
                            />

                            <div className="d-flex justify-content-between mt-4">
                              <Button 
                                variant="outline-secondary" 
                                onClick={() => handleTabClick('address', formik)}
                              >
                                <i className="bi bi-arrow-left me-2"></i>Back to Address
                              </Button>
                              <Button 
                                type="submit"
                                variant="success"
                                size="lg"
                                disabled={formik.isSubmitting}
                              >
                                {formik.isSubmitting ? 'Submitting...' : 'Complete Registration'}
                              </Button>
                            </div>
                          </Tab.Pane>
                        </Tab.Content>
                      </Tab.Container>

                      {/* Form Values Preview (for demo) */}
                      <Alert variant="info" className="mt-4">
                        <strong>Current Form Values:</strong>
                        <pre className="mb-0 mt-2">{JSON.stringify(formik.values, null, 2)}</pre>
                      </Alert>
                    </Form>
                  );
                }}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MultiTabForm;

