
const express = require('express')
const app = express()
  .set('json spaces', 2)
  .use(express.json())
  .use(require('morgan')('dev'))
  .use(express.urlencoded({ extended: false }))
  .use(express.static(require('path').join(__dirname, 'public')))
  .set('port', process.env.PORT || 5555)
  .get('/json', (req, res) => res.json({ ok: 'ok' }))
  .all('/echo/:foo?/:bar?', (req, res) => {
    const { method, ip, params, headers, query, body, signedCookies, cookies, session } = req
    res.json({ method, ip, params, headers, query, body, signedCookies, cookies, session })
  })




const serv = require('http').createServer(app);
serv.listen(app.get('port'),
  () => console.log(`listen http://localhost:${JSON.stringify(serv.address().port)}`)
);

require('./ws/ws')(serv, app)

app.get('/', (req, res) => {
  console.error('express connection');
  res.sendFile(require('path').join(__dirname, 'ws.html'));
});


const createError = require('http-errors')
app
  .use((req, res, next) => {
    require('pretty-error').start()
    return next(createError(404))
  })
  .use((err, req, res, next) => {
    console.error(err.stack)
    res.sendStatus(err.status || 500)
  });


module.exports = app;