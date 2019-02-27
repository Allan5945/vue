/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')

const app = express();

function createRenderer (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    runInNewContext: false
  }))
}

let renderer;
const templatePath = path.resolve(__dirname, './src/index.template.html')

const bundle = require('./dist/vue-ssr-server-bundle.json')
const template = fs.readFileSync(templatePath, 'utf-8')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
renderer = createRenderer(bundle, {
  template,
  clientManifest
});


app.use('/', express.static(path.resolve(__dirname, './dist')));

app.get('*', (req, res) => {

  res.setHeader("Content-Type", "text/html")

  const context = {
    title: 'Vue CLI 3 SSR example',
    url: req.url
  }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.url) {
        res.redirect(err.url)
      } else {
        // Render Error Page or Redirect
        res.status(500).end('500 | Internal Server Error')
        console.error(`error during render : ${req.url}`)
        console.error(err.stack)
      }
    }
    res.status(context.HTTPStatus || 200)
    res.send(html)
  })
})

app.listen(80, () => {
    console.log(`server started at localhost:80`)
})
