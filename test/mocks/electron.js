import { spy } from 'sinon';

const electronState = {
  fullscreen: false,
  maximized: false
};

const currentWindowSpies = {
  isFullScreen: spy(() => electronState.fullscreen),
  setFullScreen: spy(bool => { electronState.fullscreen = bool; }),
  close: spy(),
  hide: spy(),
  minimize: spy(),
  isMaximized: spy(() => electronState.maximized),
  unmaximize: spy(() => { electronState.maximized = false; }),
  maximize: spy(() => { electronState.maximized = true; })
};

export default {
  shell: {
    openExternal: spy()
  },
  remote: {
    getCurrentWindow: () => currentWindowSpies,
    dialog: {
      // Assume affermitive action at index 0
      showMessageBox: spy((obj, cb) => {
        cb(0);
      })
    },
    Menu: spy(() => ({
      append: spy(),
      popup: spy()
    })),
    MenuItem: spy(() => {})
  },
  currentWindowSpies
};
