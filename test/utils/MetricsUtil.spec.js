import { expect } from 'chai';
import { assert, stub } from 'sinon';
import metrics, { mixpanel } from '../../app/utils/MetricsUtil';
import util from '../../app/utils/Util';

describe('utils', () => {
  describe('MetricsUtil', () => {
    it('should be enabled by default', () => {
      expect(metrics.enabled()).to.be.true;
    });

    it('should toggle enabled', () => {
      metrics.setEnabled(false);
      expect(metrics.enabled()).to.be.false;
      const track = stub(mixpanel, 'track');
      metrics.track('test', {});
      assert.notCalled(track);
      track.restore();
      metrics.setEnabled(true);
    });

    it('should skip if no name provided', () => {
      const track = stub(mixpanel, 'track');
      metrics.track();
      assert.notCalled(track);
      track.restore();
    });

    it('should set unique id in local storage', () => {
      const isWindows = stub(util, 'isWindows').returns(false);
      const track = stub(mixpanel, 'track');
      metrics.track('test', {});
      track.restore();
      isWindows.restore();
      expect(window.localStorage.getItem('metrics.id')).to.exist;
    });

    it('should send data to mixpanel', () => {
      const track = stub(mixpanel, 'track');
      const isWindows = stub(util, 'isWindows').returns(true);
      metrics.track('test', {});
      isWindows.restore();
      assert.called(track);
      track.restore();
    });
  });
});
