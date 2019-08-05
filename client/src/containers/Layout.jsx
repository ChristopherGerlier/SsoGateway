import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import Menu from '../components/Menu';

export class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div>
        <Menu title="WEB STUDIO" isAuthenticated={this.props.isAuthenticated} />
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

// These props come from the application's
// state when it is started
function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    isAuthenticated,
    errorMessage,
  };
}

// we have our store setup and passed down to our container
// connect returns a connected version of Dashboard.
// The module now exports 2 components: The pure component Dashboard and
// the connected component DashboardContainer.
// We are telling the component to map its props callbacks to the action creators
// of the same name
export const LayoutContainer = connect(mapStateToProps)(Layout);
