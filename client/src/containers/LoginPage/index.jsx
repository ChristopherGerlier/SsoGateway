import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Grid, Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import AlertMessage from '../../Components/AlertMessage';

import styles from './LoginPage.scss';
import * as texts from '../../constants/applicationTexts.js';
import authenticate from '../../api/authAPI.js';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    // since handleLogin will be called from another context, bind event handler
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      alertVisible: false,
      alertMessage: '',
    };
  }

  handleLogin(event) {
    event.preventDefault();

    const userCredentials = {
      email: this.email.value,
      password: this.password.value,
    };

    // prepare callbacks
    const successCallback = (response) => {
      // convert xml to json and save values to the store
      this.setState({ alertVisible: false });
      console.log(response);
      browserHistory.push('/Home');
    };

    const failCallback = (err) => {
      let errorMessage = '';
      if (err.response) { // node.js server responded with a status code != 200
        errorMessage = err.response.data;
      } else { // node.js is not answering
        errorMessage = texts.BACKEND_NOT_OPERATIONAL;
      }
      console.log(errorMessage);
      this.setState({
        alertVisible: true,
        alertMessage: errorMessage,
      });
    };

    // send auth request to backend
    authenticate(userCredentials, successCallback, failCallback);
  }

  render() {
    let alert;
    if (this.state.alertVisible) {
      alert = <AlertMessage message={this.state.alertMessage} />;
    }

    return (
      <Grid fluid>
        <Row>
          <Col className={styles['front-bg']} md={12}>
            <div className={styles['login-form']} >
              <Col md={7}>
                <h2>ds<strong>{texts.LOGIN_WELCOME_TITLE}</strong></h2>
                <p>{texts.LOGIN_WELCOME_MESSAGE}</p>
              </Col>
              <Col md={5}>
                <form className="form-horizontal" onSubmit={this.handleLogin}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder={texts.LOGIN_FORM_EMAIL}
                      autoFocus="true"
                      tabIndex="2"
                      ref={input => { this.email = input; }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      tabIndex="3"
                      placeholder={texts.LOGIN_FORM_PASSWORD}
                      autoComplete="off"
                      ref={input => { this.password = input; }}
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit">
                      Sign in
                    </button>
                  </div>
                  {alert}
                </form>
              </Col>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default LoginPage;
