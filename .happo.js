const { RemoteBrowserTarget } = require('happo.io');
require('dotenv').config();


module.exports = {
  apiKey: process.env.APIKEY,
  apiSecret: process.env.APISECRET,

  targets: {
    'chrome-large': new RemoteBrowserTarget('chrome', {
      viewport: '1024x768',
    }),
  },
  pages: [
    { url: 'http://e93a9051.ngrok.io/Website.UI.Template.v6.happo-url/patterns/components-faq-default.inside.html', title: 'FAQ', variant: "inside"},
      { url: 'http://e93a9051.ngrok.io/Website.UI.Template.v6.happo-url/patterns/apps-health-provider-search-default.inside.html', title: 'Health Providers', variant: "inside"},
      { url: 'http://e93a9051.ngrok.io/Website.UI.Template.v6.happo-url/patterns/layout-header-default.default.html', title: 'header', variant: "inside" },
      { url: 'https://www.uml.edu', title: 'home page'}
  ],

  // type: 'react',
};