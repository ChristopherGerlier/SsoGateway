/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
import React from 'react';
import { Grid, Row, Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import styles from './LoginPage.scss';

const HomePage = () =>
(
  <Grid fluid>
    <Row>
      <Col className={styles['front-bg']} md={12}>
        <div className={styles['login-form']} >
          <Col md={7}>
            <h2><strong>Welcome to Web Studio.</strong></h2>
            <p>
              Ethoaria mercuricoious boroeous benzric forthgram Germanoandrous
              pneumment amphiart keraunography viscoclinal. Hemage deuterphyll
              coenoeous autgamous platinilogic polymorphomania ophiomycin gynaecophag
              enantioity. Glutaracean.
            </p>
          </Col>
          <Col md={5}>
            <Form horizontal>
              <FormGroup controlId="formHorizontalUsername">
                <FormControl type="email" placeholder="Pick a username" />
              </FormGroup>
              <FormGroup controlId="formHorizontalEmail">
                <FormControl className={styles['login-input']} type="email" placeholder="Email" />
              </FormGroup>
              <FormGroup controlId="formHorizontalPassword">
                <FormControl type="password" placeholder="Password" />
              </FormGroup>
              <FormGroup>
                <Button type="submit">
                  Sign in
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </div>
      </Col>
    </Row>
  </Grid>
);

export default HomePage;
