/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Grid, Row, Col } from 'react-bootstrap';
import styles from './LoginPage.scss';
import * as texts from '../../constants/applicationTexts.js';
import authenticate from '../../api/authAPI.js';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

    // since handleLogin will be called from another context, bind event handler
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();

    console.log('handle loggtrghtrgin');

    const userCredentials = {
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
    };

    // prepare callbacks
    const successCallback = (response) => {
      // convert xml to json and save values to the store
      console.log(response);
    };

    // const failCallback = (err) => {
    //   let errorMessage = '';
    //   if (err.response) { // node.js server responded with a status code != 200
    //     errorMessage = err.response.data;
    //   } else { // node.js is not answering
    //     errorMessage = texts.BACKEND_NOT_OPERATIONAL;
    //   }
    //   console.log(errorMessage);
    // };

    // send auth request to backend
    authenticate(userCredentials, successCallback);
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col className={styles['front-bg']} md={12}>
            <div className={styles['login-form']} >
              <Col md={7}>
                <h2><strong>{texts.LOGIN_WELCOME_TITLE}</strong></h2>
                <p>{texts.LOGIN_WELCOME_MESSAGE}</p>
              </Col>
              <Col md={5}>
                <form className="form-horizontal" onSubmit={this.handleLogin}>
                  <div className="form-group">
                    <input
                      className="form-control"
                      placeholder={texts.LOGIN_FORM_USERNAME}
                      tabIndex="1"
                      ref={input => { this.username = input; }}
                    />
                  </div>
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
