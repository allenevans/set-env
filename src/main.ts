import * as core from '@actions/core';

const PROTECTED_INPUT_VARS = ['INPUT_OVERWRITE'];

const allowOverwrite = () => core.getInput('overwrite') === 'true';

const setEnvironmentVariable = (key: string, value: string) => {
  if (process.env[key] !== undefined && !allowOverwrite()) {
    throw new Error(`Unable to overwrite existing environment variable ${key}`);
  }
  core.exportVariable(key, value);
};

(function run() {
  try {
    Object.keys(process.env)
      .filter((key) => /^INPUT_/.test(key) && !PROTECTED_INPUT_VARS.includes(key))
      .forEach((key) => {
        setEnvironmentVariable(key.replace(/^INPUT_/, ''), `${process.env[key]}`);
      });
  } catch (error) {
    core.setFailed(error.message);
    process.exit(1);
  }
})();
