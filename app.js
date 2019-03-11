
var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const port = process.env.PORT || 4200;

const server = app.listen(port, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Server started at     ',new Date().toString());
  console.log('listening at http://%s:%s     ', host, port);
});
