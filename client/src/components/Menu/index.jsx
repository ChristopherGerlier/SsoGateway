import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import styles from './Menu.scss';

const menuitems = () => {
  const items = [
    { name: 'Localization Tool', url: '/Home' },
    { name: 'Reports', url: '/' },
  ];

  return items.map((item, i) =>
    <NavItem key={i} eventKey={1} href="/">
      <div className={styles['menu-item']}>
        <Link to={item.url}> {item.name}</Link>
      </div>
    </NavItem>
  );
};

const Menu = ({ title }) =>
(
  <Navbar fixedTop fluid >
    <Navbar.Header>
      <div className={styles.logo}>
        <img role="presentation" src="images/favicon.ico" />
        <Link to="/"> {title} </Link>
      </div>
    </Navbar.Header>
    <Nav>
      { menuitems() }
    </Nav>
  </Navbar>
);

// Specifies the default values for props:
Menu.defaultProps = {
  title: '<Missing title>',
  items: [{ name: 'What is WebStudio ?', url: '/Home' }],
  isAuthenticated: false,
};

Menu.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Menu;
