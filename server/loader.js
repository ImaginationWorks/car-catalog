import path from 'path';
import fs from 'fs';

import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router';
import {Frontload, frontloadServerRender} from 'react-frontload';
import Loadable from 'react-loadable';
import Helmet from 'react-helmet';

import createStore from '../src/redux/store';
import App from '../src/app/app';
import manifest from '../build/asset-manifest.json';


export default (req, res) => {
  const injectHTML = (data, {htmlAttributes, title, meta, body, scripts, state}) => {
    data = data.replace('<html>', `<html ${htmlAttributes}>`);
    data = data.replace(/<title>.*?<\/title>/g, title);
    data = data.replace('</head>', `${meta}</head>`);
    data = data.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div><script>window.__PRELOADED_STATE__ = ${state}</script>`
    );
    data = data.replace('</body>', scripts.join('') + '</body>');

    return data;
  };

  fs.readFile(
    path.resolve(__dirname, '../build/index.html'),
    'utf8',
    (err, htmlData) => {


      const {store} = createStore(req.url);
      const context = {};
      const modules = [];
      frontloadServerRender(() =>
        renderToString(
          <Loadable.Capture report={m => modules.push(m)}>
            <Provider store={store}>
              <StaticRouter location={req.url} context={context}>
                <Frontload isServer={true}>
                  <App/>
                </Frontload>
              </StaticRouter>
            </Provider>
          </Loadable.Capture>
        )
      ).then(routeMarkup => {
        if (context.url) {
          // If context has a url property, then we need to handle a redirection in Redux Router
          res.writeHead(302, {
            Location: context.url
          });

          res.end();
        } else {
          const extractAssets = (assets, chunks) =>
            Object.keys(assets)
              .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
              .map(k => assets[k]);
          const extraScripts = extractAssets(manifest, modules);

          const helmet = Helmet.renderStatic();

          const html = injectHTML(htmlData, {
            htmlAttributes: helmet.htmlAttributes.toString(),
            title: helmet.title.toString(),
            meta: helmet.meta.toString(),
            body: routeMarkup,
            scripts: extraScripts,
            state: JSON.stringify(store.getState()).replace(/</g, '\\u003c')
          });
          res.send(html);
        }
      });
    }
  );
};
