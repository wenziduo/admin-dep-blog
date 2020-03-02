const proxy = require('http-proxy-middleware')
module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://39.105.181.82:8019/api',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
      // cookieDomainRewrite: "http://localhost:3000"
    })
  )
}
