import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Account } from '../../app/containers/Account';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function setup(initialState = { account: {} }) {
  const actions = {
    setAccountInfo: spy(),
    login: spy()
  };
  const store = mockStore(initialState);
  const context = { context: { store, router: { push: spy() } } };
  const component = mount(<Account {...initialState} {...actions} />, context);
  return {
    component,
    actions,
    inputs: component.find('input'),
    selects: component.find('select'),
    buttons: component.find('button')
  };
}


describe('containers', () => {
  describe('Account', () => {
    it('should call setAccountInfo when data changes', () => {
      const { actions, inputs, selects } = setup({
        account: {
          email: 'test@test.com',
          password: 'Password1',
          secret: 'test',
          platform: 'xone'
        }
      });
      expect(inputs).to.have.length(3);
      expect(selects).to.have.length(1);
      inputs.forEach(f => f.simulate('change'));
      selects.forEach(f => f.simulate('change'));
      expect(actions.setAccountInfo.callCount).to.be.equal(4);
    });

    it('should validate data when input loses focus', () => {
      const { component, inputs } = setup({
        account: {
          email: 'test@test',
          password: 'test',
          secret: '',
          platform: ''
        }
      });
      expect(inputs).to.have.length(3);
      inputs.forEach(f => f.simulate('blur'));

      const errors = component.state('errors');
      expect(errors).to.have.all.keys(['email', 'password', 'secret']);
    });

    it('should call login when button is pressed with valid credentials', () => {
      const { component, actions, buttons } = setup({
        account: {
          email: 'test@test.com',
          password: 'Password1',
          secret: 'test',
          platform: 'xone'
        }
      });
      expect(buttons).to.have.length(1);
      buttons.simulate('click');
      expect(component.state('errors')).to.be.empty;
      expect(actions.login.called).to.be.true;
    });

    it('should return errors when button is pressed with invalid credentials', () => {
      const { component, actions, buttons } = setup();
      expect(buttons).to.have.length(1);
      buttons.simulate('click');
      const errors = component.state('errors');
      expect(errors).to.have.all.keys(['email', 'password', 'secret', 'platform']);
      expect(actions.login.called).to.be.false;
    });

    it('should show code input if twoFactor is true', () => {
      const { component, inputs } = setup();
      component.setState({ twoFactor: true });
      expect(inputs).to.have.length(3);
    });

    it('should call next when button is pressed with valid code', () => {
      const next = spy();
      const { component, buttons } = setup({
        account: {
          email: 'test@test.com',
          password: 'Password1',
          secret: 'test',
          platform: 'xone',
          code: '123456'
        },
        next
      });
      component.setState({ twoFactor: true });
      expect(buttons).to.have.length(1);
      buttons.simulate('click');
      expect(component.state('errors')).to.be.empty;
      expect(next.called).to.be.true;
    });

    it('should return errors with invalid code', () => {
      const next = spy();
      const { component, buttons } = setup({
        account: {
          email: 'test@test.com',
          password: 'Password1',
          secret: 'test',
          platform: 'xone',
          code: '12345'
        },
        next
      });
      component.setState({ twoFactor: true });
      expect(buttons).to.have.length(1);
      buttons.simulate('click');
      expect(component.state('errors')).to.include.keys('code');
      expect(next.called).to.be.false;
    });
  });
});
