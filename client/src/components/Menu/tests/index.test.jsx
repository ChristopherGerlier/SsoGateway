/* eslint-disable new-cap*/
import React from 'react';
// Using MJackson's expect
import expect from 'expect';
import { shallow } from 'enzyme';

import Menu from '~/components/Menu';
import * as texts from '~/constants/applicationTexts.js';

describe('Menu', () => {
  function setup() {
    const renderedComponent = shallow(<Menu title={texts.APP_NAME} />);
    return { renderedComponent };
  }

  it('renders a <Menu> component', () => {
    const { renderedComponent } = setup();
    expect(renderedComponent.find('button').node).toExist;
  });

  it('renders the expected text', () => {
    const { renderedComponent } = setup();
    expect(renderedComponent.contains(texts.MENU_TOOLS));
    expect(renderedComponent.contains(texts.MENU_LOCALIZATION));
    expect(renderedComponent.contains(texts.MENU_REPORT));
  });

  it('renders the title', () => {
    const { renderedComponent } = setup();
    expect(renderedComponent.contains(texts.APP_NAME));
  });
});
