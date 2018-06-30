import path from 'path';

export default {
  isWindows() {
    return process.platform === 'win32';
  },
  isLinux() {
    return process.platform === 'linux';
  },
  commandOrCtrl() {
    return this.isWindows() || this.isLinux() ? 'Ctrl' : 'Command';
  },
  packagejson() {
    return {}; // JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  },
  windowsToLinuxPath(windowsAbsPath) {
    let fullPath = windowsAbsPath.replace(':', '').split(path.sep).join('/');
    if (fullPath.charAt(0) !== '/') {
      fullPath = `/${fullPath.charAt(0).toLowerCase()}${fullPath.substring(1)}`;
    }
    return fullPath;
  },
  linuxToWindowsPath(linuxAbsPath) {
    return linuxAbsPath.replace('/c', 'C:').split('/').join('\\');
  },
};
