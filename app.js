
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , url = require('url')
  , proxy = require('proxy-middleware');

var app = module.exports = express.createServer();

app.use('/api/hotels', proxy(url.parse('https://m.travelrepublic.co.uk/api2/hotels/static/gethotelsbydestination')));

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
