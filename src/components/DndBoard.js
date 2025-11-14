import React from 'react';
import { Formik, Form, Field } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';

const DragAndDropBoard = () => {
  // Initial form values including draggable items
  const initialValues = {
    email: '',
    items: [
      { id: '1', name: 'Task 1', category: 'todo' },
      { id: '2', name: 'Task 2', category: 'todo' },
      { id: '3', name: 'Task 3', category: 'inProgress' },
      { id: '4', name: 'Task 4', category: 'done' }
    ]
  };

  // Categories for our drag and drop areas
  const categories = [
    { id: 'todo', title: 'To Do' },
    { id: 'inProgress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
  ];

  // Handle form submission
  const handleSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div className="container mt-4">
      <h2>Project Board</h2>
      
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            {/* Standard Formik field */}
            <div className="form-group mb-4">
              <label htmlFor="email" className="form-label">Project Email</label>
              <Field 
                name="email" 
                type="email" 
                className="form-control" 
                placeholder="Enter project email" 
              />
            </div>

            {/* Drag and Drop Board */}
            <div className="row">
              {categories.map(category => (
                <div key={category.id} className="col-md-4">
                  <div className="card">
                    <div className="card-header bg-primary text-white">
                      <h5 className="card-title mb-0">{category.title}</h5>
                    </div>
                    <div 
                      className="card-body"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const itemId = e.dataTransfer.getData('text/plain');
                        const updatedItems = values.items.map(item =>
                          item.id === itemId ? { ...item, category: category.id } : item
                        );
                        setFieldValue('items', updatedItems);
                      }}
                      style={{ minHeight: '200px' }}
                    >
                      {values.items
                        .filter(item => item.category === category.id)
                        .map(item => (
                          <div
                            key={item.id}
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData('text/plain', item.id);
                            }}
                            className="card mb-2 cursor-grab"
                          >
                            <div className="card-body p-2">
                              <p className="mb-0">{item.name}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Debug and Submit */}
            <div className="mt-4">
              <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Save Board'}
              </button>
            </div>

            {/* Debug output to see form values */}
            <details className="mt-4">
              <summary>Form Data (for debugging)</summary>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </details>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DragAndDropBoard;


