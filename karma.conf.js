const path = require('path');

// Karma configuration here
module.exports = (config) => {
  config.set({
    logLevel: config.LOG_INFO,
    port: 3334,
    browsers: ['ChromeHeadless'],
    concurrency: Infinity,
    singleRun: true, //just run once by default
    frameworks: ['jasmine'], //use jasmine as framework
    files: [
      path.join(__dirname, 'node_modules', 'phantomjs-polyfill', 'bind-polyfill.js'), // To enable PhantomJS to render React components
      'karma.tests.js' //test files
    ],
    preprocessors: {
      'karma.tests.js': ['webpack', 'sourcemap'] //preprocess with webpack and sourcemap loader
    },
    reporters: ['dots'], //report results in this format
    webpack: require('./webpack.config'),
    webpackMiddleware: {
      stats: {
        colors: true,
        hash: false,
        version: false,
        timings: true,
        assets: false,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: false,
        warnings: true,
        publicPath: false
      },
    },
  });
};
