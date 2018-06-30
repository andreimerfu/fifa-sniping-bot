import assign from 'lodash/assign';
import Mixpanel from 'mixpanel';
import uuid from 'node-uuid';
import fs from 'fs';
import path from 'path';
import os from 'os';
import osxRelease from 'osx-release';
import util from './Util';

let settings;
try {
  settings = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'settings.json'), 'utf8'));
} catch (err) {
  settings = {};
}

let token = process.env.NODE_ENV === 'development' ? settings['mixpanel-dev'] : settings.mixpanel;
if (!token) {
  token = 'none';
}

export const mixpanel = Mixpanel.init(token);

if (window.localStorage.getItem('metrics.enabled') === null) {
  window.localStorage.setItem('metrics.enabled', true);
}

export default {
  enabled() {
    return window.localStorage.getItem('metrics.enabled') === 'true';
  },
  setEnabled(enabled) {
    window.localStorage.setItem('metrics.enabled', !!enabled);
  },
  track(name, data) {
    if (!name) {
      return;
    }

    const payload = data || {};

    if (window.localStorage.getItem('metrics.enabled') !== 'true') {
      return;
    }

    let id = window.localStorage.getItem('metrics.id');
    if (!id) {
      id = uuid.v4();
      window.localStorage.setItem('metrics.id', id);
    }

    const osName = os.platform();
    const osVersion = util.isWindows() ? os.release() : osxRelease(os.release()).version;

    mixpanel.track(name, assign({
      distinct_id: id,
      version: util.packagejson().version,
      'Operating System': osName,
      'Operating System Version': osVersion,
      'Operating System Architecture': os.arch()
    }, payload));
  },

};
