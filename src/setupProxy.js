const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/xair", {
      target: "http://localhost:8000",
      ws: true,
    })
  );
};
