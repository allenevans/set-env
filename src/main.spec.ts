import * as core from '@actions/core';

jest.mock('@actions/core', () => ({
  exportVariable: jest.fn(),
  getInput: jest.fn(),
  setFailed: jest.fn(),
}));

describe('set-env', () => {
  afterEach(() => {
    Object.keys(process.env)
      .filter((key) => key.match(/^INPUT_/))
      .forEach((key) => {
        delete process.env[key];
      });
  });

  it('exports all environment variables beginning with INPUT_', () => {
    process.env.INPUT_VERSION = '1.2.3';

    jest.isolateModules(() => require('./main'));

    expect(core.exportVariable).toHaveBeenCalledTimes(1);
    expect(core.exportVariable).toHaveBeenCalledWith('VERSION', '1.2.3');
  });

  it('exports multiple environment variables beginning with INPUT_', () => {
    process.env.INPUT_A = '1';
    process.env.INPUT_B = '2';
    process.env.INPUT_C = '3';

    jest.isolateModules(() => require('./main'));

    expect(core.exportVariable).toHaveBeenCalledTimes(3);
    expect(core.exportVariable).toHaveBeenCalledWith('A', '1');
    expect(core.exportVariable).toHaveBeenCalledWith('B', '2');
    expect(core.exportVariable).toHaveBeenCalledWith('C', '3');
  });

  it('overwrites existing environment variables', () => {
    jest.spyOn(process, 'exit').mockImplementation((code?: number): never => {
      throw new Error(`${code}`);
    });

    process.env.EXISTING = 'one';
    process.env.INPUT_EXISTING = 'two';

    (<jest.Mock>core.getInput).mockImplementation(() => 'true');

    jest.isolateModules(() => expect(() => require('./main')).not.toThrowError());

    expect(core.exportVariable).toHaveBeenCalledWith('EXISTING', 'two');
  });

  describe('exceptions', () => {
    beforeEach(() => {
      jest.spyOn(process, 'exit').mockImplementation((code?: number): never => {
        throw new Error(`${code}`);
      });
    });

    it('reports exceptions', () => {
      (<jest.Mock>core.exportVariable).mockImplementation(() => {
        throw new Error('FAIL');
      });
      jest.spyOn(process, 'exit').mockImplementation((code?: number): never => {
        throw new Error(`${code}`);
      });

      process.env.INPUT_TEST = 'test';

      jest.isolateModules(() => expect(() => require('./main')).toThrowError());

      expect(core.setFailed).toHaveBeenCalledTimes(1);
      expect(core.setFailed).toHaveBeenCalledWith('FAIL');
    });
  });
});
