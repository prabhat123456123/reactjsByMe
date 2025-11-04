import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

// Reusable Form Column Component
const FormCol = ({ children, xs, sm, md, lg , xl , ...props }) => {
  return (
    <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl} {...props}>
      {children}
    </Col>
  );
};
export default FormCol;
