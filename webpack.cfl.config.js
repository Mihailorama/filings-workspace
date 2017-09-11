const path = require('path');
const merge = require('webpack-merge');
const fs = require('fs');

const mainConfig = require('./webpack.config');
const oauthToken = require('./.dev/oauth-token');

const plugins = mainConfig.plugins;
mainConfig.plugins = [];

const devDir = path.resolve(__dirname, '.dev');

const host = process.env.npm_package_config_devserver_host;
const port = parseInt(process.env.npm_package_config_devserver_port, 10);
const https = process.env.npm_package_config_devserver_https === 'true';
const baseUrl = `${https ? 'https' : 'http'}://${host}:${port}`;
const apiProxyUrl = process.env.npm_package_config_api_proxy;

const proxyHeaders = {};
oauthToken.load(token => proxyHeaders['Authorization'] = `Bearer ${token.access_token}`);

let isLoggedIn = true;

const mergedConfig = merge.smart(mainConfig, {
  output: {
    publicPath: `${baseUrl}/boolean-validator/static/`,
  },
  devtool: 'inline-source-map',
  watch: true,
  plugins: plugins,
  devServer: {
    host,
    port,
    contentBase: 'src/www',
    hot: true,
    open: false,
    https,
    cert: fs.readFileSync(path.resolve(devDir, 'star_cfl_io.crt')),
    ca: fs.readFileSync(path.resolve(devDir, 'digicert.pem')),
    key: fs.readFileSync(path.resolve(devDir, 'star_cfl_io.key')),
    historyApiFallback: {
      index: `${mainConfig.output.publicPath}/index.html`,
    },
    proxy: {
      '/api/user': {
        // logLevel: 'debug',
        target: oauthToken.BASE_HOST,
        changeOrigin: true,
        pathRewrite: {
          '^/api/user': oauthToken.USER_PATH,
        },
        headers: proxyHeaders,
        onProxyReq: (proxyReq) => {
          proxyReq.setHeader('Authorization', isLoggedIn ? proxyHeaders['Authorization'] : 'Bearer invalid');
        },
      },
      '/api/': {
        // logLevel: 'debug',
        target: apiProxyUrl,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/',
        },
        headers: proxyHeaders,
        onProxyRes: (proxyRes) => {
          proxyRes.headers['x-frame-options'] = 'SAMEORIGIN'
        },
        onProxyReq: (proxyReq) => {
          proxyReq.setHeader('Authorization', isLoggedIn ? proxyHeaders['Authorization'] : 'Bearer invalid');
        },
      },
    },
    setup: function (app) {
      app.get('/auth/logout', (req, res) => {
        isLoggedIn = false;
        res.send('<p>Logged Out. Visit <a href="/auth/login">/auth/login</a> to login.</p>');
      });
      app.get('/auth/login', (req, res) => {
        isLoggedIn = true;
        res.send('<p>Logged In. Visit <a href="/auth/logout">/auth/logout</a> to logout.</p>');
      });
      app.get('/api/apps', (req, res) => {
        res.sendFile(path.resolve(devDir, 'apps.json'));
      });
    },
    // webpack output options
    stats: {
      // hide all chunk dependencies because it's unreadable
      chunkModules: false,
      // noize
      assets: false,
    },
  },
});

(function enableReactHotLoader() {
  // Load before everything except `babel-polyfill`
  mergedConfig.entry.vendors.splice(1, 0, 'react-hot-loader/patch');
  // Add to typescript rule
  mergedConfig.module.rules[1].use.unshift({ loader: 'react-hot-loader/webpack' });
})();

// Edit linting config
mergedConfig.module.rules[0].options = Object.assign({}, mergedConfig.module.rules[0].options, {emitErrors: false});

module.exports = mergedConfig;
