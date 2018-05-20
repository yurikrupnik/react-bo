// import { renderToString } from 'react-dom/server';
// import App from '../components/App';
const { renderToString } = require('react-dom/server');

const html = App => (ctx) => {
    ctx.type = 'html';
    ctx.html = `
    <!doctype html>
    <html lang="en">
      <head>
        <base href="/" />
        <meta charset="UTF-8">
        <title>Engine</title>
        <link rel="stylesheet" href="main.css">
      </head>
      <body>
        <div>shalom</div>
        <div id="root">${renderToString(App)}</div>
        <script src="main.bundle.js"></script>
      </body>
    </html>
  `;
    ctx.body = ctx.html;

    // ctx.vary('Accept-Encoding');
    // if (ctx.acceptsEncodings('gzip')) {
    //     ctx.set('Content-Encoding', 'gzip');
    //     ctx.body = ctx.body.pipe(createGzip());
    // }
};

module.exports = html;
