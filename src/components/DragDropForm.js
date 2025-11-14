import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';

const DragAndDropFormBuilder = () => {
  const initialFields = [
    { id: '1', type: 'text', name: 'name', label: 'Full Name', placeholder: 'Enter your full name', required: true },
    { id: '2', type: 'email', name: 'email', label: 'Email Address', placeholder: 'Enter your email', required: true },
    { id: '3', type: 'tel', name: 'phone', label: 'Phone Number', placeholder: 'Enter your phone number', required: false }
  ];

  const [formFields, setFormFields] = useState(initialFields);

  const initialValues = {
    name: '',
    email: '',
    phone: ''
  };

  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
    e.currentTarget.style.opacity = '0.4';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = '#f8f9fa';
  };

  const handleDragLeave = (e) => {
    e.currentTarget.style.backgroundColor = '';
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (sourceIndex !== targetIndex) {
      const updatedFields = [...formFields];
      const [movedField] = updatedFields.splice(sourceIndex, 1);
      updatedFields.splice(targetIndex, 0, movedField);
      setFormFields(updatedFields);
    }
    
    e.currentTarget.style.backgroundColor = '';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <Field
            name={field.name}
            type={field.type}
            className="form-control"
            placeholder={field.placeholder}
            required={field.required}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <h2>Drag & Drop Form Builder</h2>
          <p className="text-muted">Drag fields to reorder them</p>
          
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                {formFields.map((field, index) => (
                  <div
                    key={field.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    className="card mb-3 cursor-grab"
                    style={{ cursor: 'grab' }}
                  >
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-2">
                        <span className="badge bg-secondary me-2">
                          {index + 1}
                        </span>
                        <span className="text-muted small">
                          Drag handle
                        </span>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor={field.name} className="form-label">
                          {field.label}
                          {field.required && <span className="text-danger">*</span>}
                        </label>
                        {renderField(field)}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-4">
                  <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Form'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Form Preview</h5>
            </div>
            <div className="card-body">
              <p className="text-muted">Current field order:</p>
              <ul className="list-group">
                {formFields.map((field, index) => (
                  <li key={field.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{field.label}</span>
                    <span className="badge bg-primary rounded-pill">{index + 1}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-3">
                <button 
                  className="btn btn-outline-secondary btn-sm" 
                  onClick={() => setFormFields(initialFields)}
                >
                  Reset Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom CSS for better drag and drop visuals
const styles = `
  .cursor-grab {
    cursor: grab;
  }
  
  .cursor-grab:active {
    cursor: grabbing;
  }
  
  .card {
    transition: all 0.2s ease;
  }
  
  .card:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  
  .dragging {
    opacity: 0.5;
    transform: rotate(5deg);
  }
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default DragAndDropFormBuilder;