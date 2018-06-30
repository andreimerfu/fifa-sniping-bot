import { expect } from 'chai';
import { stub } from 'sinon';
import util from '../../app/utils/Util';

describe('utils', () => {
  describe('Util', () => {
    it('should determine windows environment', () => {
      expect(util.isWindows()).to.equal(process.platform === 'win32');
    });

    it('should determine linux environment', () => {
      expect(util.isLinux()).to.equal(process.platform === 'linux');
    });

    it('should determine Ctrl for Windows', () => {
      const isWindows = stub(util, 'isWindows').returns(true);
      expect(util.commandOrCtrl()).to.equal('Ctrl');
      isWindows.restore();
    });

    it('should determine Command for Mac', () => {
      const isWindows = stub(util, 'isWindows').returns(false);
      const isLinux = stub(util, 'isLinux').returns(false);
      expect(util.commandOrCtrl()).to.equal('Command');
      isWindows.restore();
      isLinux.restore();
    });

    it('should return empty object for packagejson [deprecated]', () => {
      expect(util.packagejson()).to.eql({});
    });

    it('should convert windows path to linux path', () => {
      if (util.isWindows()) {
        expect(util.windowsToLinuxPath('C:\\test\\dir')).to.equal('/c/test/dir');
      } else {
        expect(util.windowsToLinuxPath('C:\\test\\dir')).to.equal('/c\\test\\dir');
      }
    });

    it('should convert linux path to windows path', () => {
      expect(util.linuxToWindowsPath('/c/test/dir')).to.equal('C:\\test\\dir');
    });
  });
});
