import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import PlayerCard from '../../../app/components/player/PlayerCard';
import player, { totwPlayer } from '../../mocks/player';

function setup(totw = false) {
  const testPlayer = totw ? totwPlayer : player;
  const component = shallow(<PlayerCard player={testPlayer} />, context);
  return {
    component,
    name: component.find('.ut-item_heading'),
    headshot: component.find('.ut-item_headshot')
  };
}

describe('components', () => {
  describe('player', () => {
    describe('PlayerCard', () => {
      it('should display player name in all caps', () => {
        const { name } = setup();
        expect(name).to.have.length(1);
        expect(name.text()).to.equal(player.name.toUpperCase());
      });

      it('should display headshot image', () => {
        const { headshot } = setup();
        expect(headshot).to.have.length(1);
        expect(headshot.prop('src')).to.equal(player.headshot.largeImgUrl);
      });

      it('should display TOTW image if available', () => {
        const { headshot } = setup(true);
        expect(headshot).to.have.length(1);
        expect(headshot.prop('src')).to.equal(totwPlayer.specialImages.largeTOTWImgUrl);
      });
    });
  });
});
