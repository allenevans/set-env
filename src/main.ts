import * as core from '@actions/core';

(function run() {
  try {
    Object.keys(process.env)
      .filter((key) => /^INPUT_/.test(key))
      .forEach((key) => {
        core.exportVariable(key.replace(/^INPUT_/, ''), `${process.env[key]}`);
      });
  } catch (error) {
    core.setFailed(error.message);
    process.exit(1);
  }
})();
