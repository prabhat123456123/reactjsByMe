import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'react-bootstrap';

const AdvancedDragDropTable = () => {
  const [tableData, setTableData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '123-456-7891', status: 'Inactive' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '123-456-7892', status: 'Active' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '123-456-7893', status: 'Pending' }
  ]);

  const [columns, setColumns] = useState([
    { key: 'name', label: 'Full Name', sortable: true, editable: true },
    { key: 'email', label: 'Email', sortable: true, editable: true },
    { key: 'phone', label: 'Phone', sortable: false, editable: true },
    { key: 'status', label: 'Status', sortable: true, editable: false }
  ]);

  const [draggedRow, setDraggedRow] = useState(null);
  const [draggedColumn, setDraggedColumn] = useState(null);

  // Row drag and drop
  const handleRowDragStart = (e, index) => {
    setDraggedRow(index);
    e.dataTransfer.setData('text/plain', index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleRowDragOver = (e, index) => {
    e.preventDefault();
    if (draggedRow !== null && draggedRow !== index) {
      e.currentTarget.classList.add('drag-over');
    }
  };

  const handleRowDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleRowDrop = (e, targetIndex) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (sourceIndex !== targetIndex) {
      const newData = [...tableData];
      const [movedRow] = newData.splice(sourceIndex, 1);
      newData.splice(targetIndex, 0, movedRow);
      setTableData(newData);
    }
    setDraggedRow(null);
  };

  // Column drag and drop
  const handleColumnDragStart = (e, index) => {
    setDraggedColumn(index);
    e.dataTransfer.setData('text/plain', index);
  };

  const handleColumnDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (sourceIndex !== targetIndex) {
      const newColumns = [...columns];
      const [movedColumn] = newColumns.splice(sourceIndex, 1);
      newColumns.splice(targetIndex, 0, movedColumn);
      setColumns(newColumns);
    }
    setDraggedColumn(null);
  };

  // Sort columns
  const handleSort = (columnKey) => {
    const newData = [...tableData].sort((a, b) => {
      if (a[columnKey] < b[columnKey]) return -1;
      if (a[columnKey] > b[columnKey]) return 1;
      return 0;
    });
    setTableData(newData);
  };

  return (
    <div className="container mt-4">
        <Row className="gx-2">
                <Col md={4} className="border-end ">
     <div className="card" style={{border: "none"}}>
  {/* Image */}
 

  {/* Content */}
  <div className="card-body">
    <h5 className="card-title fw-semibold">John Doe</h5>

    <div className="d-flex flex-wrap align-items-center mt-3">

      {/* Email */}
      <div className="d-flex align-items-center border-end mb-2" style={{paddingRight:"2px", marginRight:"0.8px"}}>
        <span className="fw-semibold">📧</span>
        <span className="ms-1">john@example.com</span>
      </div>

      {/* Phone */}
      <div className="d-flex align-items-center border-end mb-2" style={{paddingRight:"2px", marginRight:"0.8px"}}>
        <span className="fw-semibold">📞</span>
        <span className="ms-1">9876543210</span>
      </div>

      {/* Address */}
      <div className="d-flex align-items-center mb-2">
        <span className="fw-semibold">📍</span>
        <span className="ms-1">Delhi, India</span>
      </div>

    </div>
  </div>
</div>
</Col>

<Col md={4} className="border-end">
     <div className="card" style={{border: "none"}}>
  {/* Image */}
 

  {/* Content */}
  <div className="card-body">
    <h5 className="card-title fw-semibold">John Doe</h5>

    <div className="d-flex flex-wrap align-items-center mt-3">

      {/* Email */}
      <div className="d-flex align-items-center border-end mb-2" style={{paddingRight:"2px", marginRight:"0.8px"}}>
        <span className="fw-semibold">📧</span>
        <span className="ms-1">john@example.com</span>
      </div>

      {/* Phone */}
      <div className="d-flex align-items-center border-end mb-2" style={{paddingRight:"2px", marginRight:"0.8px"}}>
        <span className="fw-semibold">📞</span>
        <span className="ms-1">9876543210</span>
      </div>

      {/* Address */}
      <div className="d-flex align-items-center mb-2">
        <span className="fw-semibold">📍</span>
        <span className="ms-1">Delhi, India</span>
      </div>

    </div>
  </div>
</div>
</Col>
<Col md={4}>
     <div className="card" style={{border: "none"}}>
  {/* Image */}
  

  {/* Content */}
  <div className="card-body">
    <h5 className="card-title fw-semibold">John Doe</h5>

    <div className="d-flex flex-wrap align-items-center mt-3">

      {/* Email */}
      <div className="d-flex align-items-center border-end  mb-2" style={{paddingRight:"2px", marginRight:"0.8px"}}>
        <span className="fw-semibold">📧</span>
        <span className="ms-1">john@example.com</span>
      </div>

      {/* Phone */}
      <div className="d-flex align-items-center border-end mb-2" style={{paddingRight:"2px", marginRight:"0.8px"}}>
        <span className="fw-semibold">📞</span>
        <span className="ms-1">9876543210</span>
      </div>

      {/* Address */}
      <div className="d-flex align-items-center mb-2">
        <span className="fw-semibold">📍</span>
        <span className="ms-1">Delhi, India</span>
      </div>

    </div>
  </div>
</div>
</Col>
</Row>
  <Row className="gx-2">
                <Col md={4} className="d-flex justify-content-center">
                
     <div className="card">
  {/* Image */}
 

  {/* Content */}
  <div className="card-body">
    <h5 className="card-title fw-semibold">John Doe</h5>

    <div className="d-flex flex-wrap align-items-center mt-3">

      {/* Email */}
      <div className="d-flex align-items-center border-end pe-3 me-3 mb-2">
        <span className="fw-semibold">📧</span>
        <span className="ms-1">john@example.com</span>
      </div>

      {/* Phone */}
      <div className="d-flex align-items-center border-end pe-3 me-3 mb-2">
        <span className="fw-semibold">📞</span>
        <span className="ms-1">9876543210</span>
      </div>

      {/* Address */}
      <div className="d-flex align-items-center mb-2">
        <span className="fw-semibold">📍</span>
        <span className="ms-1">Delhi, India</span>
      </div>

    </div>
  </div>
</div>
</Col>

<Col md={4} className="d-flex justify-content-center">
 <div className="vertical-divider"></div>
     <div className="card" >
  {/* Image */}
 

  {/* Content */}
  <div className="card-body">
    <h5 className="card-title fw-semibold">John Doe</h5>

    <div className="d-flex flex-wrap align-items-center mt-3">

      {/* Email */}
      <div className="d-flex align-items-center border-end pe-3 me-3 mb-2">
        <span className="fw-semibold">📧</span>
        <span className="ms-1">john@example.com</span>
      </div>

      {/* Phone */}
      <div className="d-flex align-items-center border-end pe-3 me-3 mb-2">
        <span className="fw-semibold">📞</span>
        <span className="ms-1">9876543210</span>
      </div>

      {/* Address */}
      <div className="d-flex align-items-center mb-2">
        <span className="fw-semibold">📍</span>
        <span className="ms-1">Delhi, India</span>
      </div>

    </div>
  </div>
</div>
</Col>
<Col md={4} className="d-flex justify-content-center">
 <div className="vertical-divider"></div>
     <div className="card" >
  {/* Image */}
  

  {/* Content */}
  <div className="card-body">
    <h5 className="card-title fw-semibold">John Doe</h5>

    <div className="d-flex flex-wrap align-items-center mt-3">

      {/* Email */}
      <div className="d-flex align-items-center border-end pe-3 me-3 mb-2">
        <span className="fw-semibold">📧</span>
        <span className="ms-1">john@example.com</span>
      </div>

      {/* Phone */}
      <div className="d-flex align-items-center border-end pe-3 me-3 mb-2">
        <span className="fw-semibold">📞</span>
        <span className="ms-1">9876543210</span>
      </div>

      {/* Address */}
      <div className="d-flex align-items-center mb-2">
        <span className="fw-semibold">📍</span>
        <span className="ms-1">Delhi, India</span>
      </div>

    </div>
  </div>
</div>
</Col>
</Row>
      <h2>Advanced Drag & Drop Table</h2>
      
      <Formik
        initialValues={{}}
        onSubmit={() => {
          alert('Table data submitted! Check console.');
          console.log('Table Data:', tableData);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">User Management</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th style={{ width: '60px' }}>#</th>
                        {columns.map((column, index) => (
                          <th
                            key={column.key}
                            draggable
                            onDragStart={(e) => handleColumnDragStart(e, index)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleColumnDrop(e, index)}
                            style={{ cursor: 'grab' }}
                            className={draggedColumn === index ? 'opacity-50' : ''}
                          >
                            <div className="d-flex align-items-center justify-content-between">
                              <span>{column.label}</span>
                              <div>
                                {column.sortable && (
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-secondary ms-1"
                                    onClick={() => handleSort(column.key)}
                                  >
                                    ↕️
                                  </button>
                                )}
                              </div>
                            </div>
                          </th>
                        ))}
                        <th style={{ width: '100px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row, rowIndex) => (
                        <tr
                          key={row.id}
                          draggable
                          onDragStart={(e) => handleRowDragStart(e, rowIndex)}
                          onDragOver={(e) => handleRowDragOver(e, rowIndex)}
                          onDragLeave={handleRowDragLeave}
                          onDrop={(e) => handleRowDrop(e, rowIndex)}
                          onDragEnd={() => setDraggedRow(null)}
                          className={draggedRow === rowIndex ? 'table-active' : ''}
                          style={{ cursor: 'grab' }}
                        >
                          <td>
                            <div className="d-flex align-items-center">
                              <span className="badge bg-secondary me-2">{rowIndex + 1}</span>
                              <span>↕️</span>
                            </div>
                          </td>
                          
                          {columns.map(column => (
                            <td key={column.key}>
                              {column.editable ? (
                                <Field
                                  name={`${row.id}.${column.key}`}
                                  className="form-control form-control-sm"
                                  defaultValue={row[column.key]}
                                  onBlur={(e) => {
                                    const newData = [...tableData];
                                    newData[rowIndex][column.key] = e.target.value;
                                    setTableData(newData);
                                  }}
                                />
                              ) : (
                                <span className={`
                                  badge 
                                  ${row.status === 'Active' ? 'bg-success' : ''}
                                  ${row.status === 'Inactive' ? 'bg-danger' : ''}
                                  ${row.status === 'Pending' ? 'bg-warning' : ''}
                                `}>
                                  {row[column.key]}
                                </span>
                              )}
                            </td>
                          ))}
                          
                          <td>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => {
                                setTableData(tableData.filter((_, i) => i !== rowIndex));
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {tableData.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-muted">No data available. Add some rows!</p>
                  </div>
                )}

                <div className="mt-3 d-flex gap-2 flex-wrap">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      const newId = Math.max(...tableData.map(r => r.id)) + 1;
                      const newRow = {
                        id: newId,
                        name: 'New User',
                        email: `user${newId}@example.com`,
                        phone: '000-000-0000',
                        status: 'Pending'
                      };
                      setTableData([...tableData, newRow]);
                    }}
                  >
                    Add New Row
                  </button>
                  
                  <button type="submit" className="btn btn-success">
                    Save Changes
                  </button>
                  
                  <button type="button" className="btn btn-outline-secondary ms-auto">
                    Export Data
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <style jsx>{`
        .drag-over {
          background-color: #e3f2fd !important;
          border: 2px dashed #2196f3;
        }
        
        .opacity-50 {
          opacity: 0.5;
        }
        
        tr {
          transition: all 0.2s ease;
        }
        
        tr:active {
          cursor: grabbing;
        }
           
        .vertical-divider {
  width: 1px;
  height: 60%;    /* reduce height */
  background-color: #dee2e6; /* Bootstrap light border */
  align-self: center; /* center vertically */
  margin-right: 15px; /* spacing from card */
}

               
      `}</style>
    </div>
  );
};

export default AdvancedDragDropTable;