/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import SideBarMenu from '../../components/SideBarMenu';
import styles from './HomePage.scss';

const HomePage = () =>
(
  <Grid fluid>
    <Row className={styles['page-header']}>
      <Col md={10} mdOffset={1} >
        <h1>Web Studio</h1>
        <p className="lead">Learn how to setup Web Studio</p>
      </Col>
    </Row>
    <Row>
      <Col md={2} mdOffset={1}>
        <SideBarMenu />
      </Col>
      <Col md={7} className={styles['docs-content']}>
        <h2>Welcome</h2>
        <h3>Let's jump in</h3>
        <p className="lead text-muted">Use the sidebar on the left to navigate the docs.
        </p>
        <div className="alert alert-warning">
          This guide is constantly being updated.
        </div>
        <Col sm={4}>
          <Link to={'LocalizationTool'}>
            <h4>Localization Tool</h4>
          </Link>
          <p>
            Iteration yaw wxorm gear limiting device Metal Man
            charging iron ID-10T velocity cam.
          </p>
        </Col>
        <Col sm={4}>
          <Link to={'Report'}>
            <h4>Reports</h4>
          </Link>
          <p>
            Arm drive power screw recall parallel light emitting
            diode motion axis yaw solar dexterity Dot Matrix degrees
            of freedom hover DARPA.
          </p>
        </Col>
        <Col sm={4}>
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
