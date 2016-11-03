import React, { PropTypes } from 'react';
import { Alert } from 'react-bootstrap';

const AlertMessage = ({ message }) =>
(
  <Alert bsStyle="danger">
    { message }
  </Alert>
);

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default AlertMessage;
