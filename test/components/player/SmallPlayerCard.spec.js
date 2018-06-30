import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow } from 'enzyme';
import { SmallPlayerCard } from '../../../app/components/player/SmallPlayerCard';
import player, { totwPlayer } from '../../mocks/player';

function setup(totw = false) {
  const actions = {
    add: spy()
  };
  const testPlayer = totw ? totwPlayer : player;
  const component = shallow(<SmallPlayerCard {...actions} player={testPlayer} />, context);
  return {
    component,
    actions,
    card: component.find('.ut-item--player'),
    name: component.find('.ut-item_heading'),
    headshot: component.find('.ut-item_headshot')
  };
}

describe('components', () => {
  describe('player', () => {
    describe('SmallPlayerCard', () => {
      it('should display player name', () => {
        const { name } = setup();
        expect(name).to.have.length(1);
        expect(name.text()).to.equal(player.name);
      });

      it('should display headshot image', () => {
        const { headshot } = setup();
        expect(headshot).to.have.length(1);
        expect(headshot.prop('src')).to.equal(player.headshot.medImgUrl);
      });

      it('should display TOTW image if available', () => {
        const { headshot } = setup(true);
        expect(headshot).to.have.length(1);
        expect(headshot.prop('src')).to.equal(totwPlayer.specialImages.medTOTWImgUrl);
      });

      it('should add a player when clicked', () => {
        const { actions, card } = setup();
        expect(card).to.have.length(1);
        card.simulate('click');
        expect(actions.add.called).to.be.true;
      });
    });
  });
});
