import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

// Reusable Form Row Component for side-by-side fields
const FormRow = ({ children }) => {
  return <Row>{children}</Row>;
};

export default FormRow;
