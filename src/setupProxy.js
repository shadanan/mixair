const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/xair", "/feed"], {
      target: "http://localhost:8000",
      ws: true,
    })
  );
};
