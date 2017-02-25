const Koa = require('koa');
const statics = require('koa-static');
const path = require('path');

const app = new Koa();

app.use(statics(path.join(__dirname, '..', '..', 'public')));

app.use((ctx) => {
  ctx.body = `
<!doctype html>
<html lang="en">
  <head>
    <title>WebGL 2 Demo</title>
  </head>
  <body>
    <div class="container">
      <canvas id="glcanvas"></canvas>
    </div>
    <script src="/dist/bundle.js"></script>
  </body>
</html>
`;
});

app.listen(3000);
