module.exports = (config) => {
  config.set({
    basePath: '../',
    files: [
      'lib/**/!(mocha).js',
      'src/underbar.js',
      'test/**/*.js',
    ],
    frameworks: ['mocha'],
    browsers: ['ChromeHeadless'],
    logLevel: config.LOG_INFO,
    singleRun: true,
    port: 9876,
  });
};
