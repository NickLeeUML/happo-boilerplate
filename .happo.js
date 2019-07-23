const { RemoteBrowserTarget } = require('happo.io');
require('dotenv').config();


module.exports = {
  apiKey: process.env.APIKEY,
  apiSecret: process.env.APISECRET,

  targets: {
    chrome: new RemoteBrowserTarget('chrome', {
      viewport: '1024x768',
    }),
  },

  type: 'react',
};