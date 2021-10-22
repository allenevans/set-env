import * as core from '@actions/core';

const setEnvironmentVariable = (key: string, value: string) => {
  core.exportVariable(key, value);
};

(function run() {
  try {
    Object.keys(process.env)
      .filter((key) => /^INPUT_/.test(key))
      .forEach((key) => {
        setEnvironmentVariable(key.replace(/^INPUT_/, ''), `${process.env[key]}`);
      });
  } catch (error) {
    core.setFailed((error as Error).message);
    process.exit(1);
  }
})();
