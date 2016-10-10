/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import styles from './HomePage.scss';

const HomePage = () =>
(
  <Grid fluid>
    <Row className={styles['page-header']}>
      <Col md={8} mdOffset={1} >
        <h1>Web Studio</h1>
        <p className="lead">
          Robot ipsum Robozoon xuogyne paratomy rhizoways indogenesis sinoule
          laparoode contrix quinquathon. Diploey.
        </p>
      </Col>
    </Row>
    <Row>
      <Col md={8} mdOffset={2} className={styles['docs-content']}>
        <Col sm={3}>
          <Link to={'LocalizationTool'}>
            <h4>Localization Tool</h4>
          </Link>
          <p>
            Iteration yaw wxorm gear limiting device Metal Man
            charging iron ID-10T velocity cam.
          </p>
        </Col>
        <Col sm={3}>
          <Link to={'Report'}>
            <h4>Reports</h4>
          </Link>
          <p>
            Arm drive power screw recall parallel light emitting
            diode motion axis yaw solar dexterity Dot Matrix degrees
            of freedom hover DARPA.
          </p>
        </Col>
        <Col sm={3}>
          <Link to={'Report'}>
            <h4>PRS</h4>
          </Link>
          <p>
            Tony current LaGrange multipliers glass drive train
            mechanical mechanization hydraulic autonomous shear
            pad bolt joint motion Box.
          </p>
        </Col>
      </Col>
    </Row>
  </Grid>
);

export default HomePage;
