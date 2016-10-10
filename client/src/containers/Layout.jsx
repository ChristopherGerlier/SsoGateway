/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Menu from '../components/Menu';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div>
        <Menu title="WEB STUDIO" />
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
