const app = require('./app');
const cors = require('cors')
var finalhandler = require('finalhandler')
var http = require('http')
var morgan = require('morgan')
 
// create "middleware"
var logger = morgan('combined')
const Axios =require('axios')
init();
Axios.defaults.baseURL = 'http://localhost:3001';
http.createServer(function (req, res) {
  var done = finalhandler(req, res)
  logger(req, res, function (err) {
    if (err) return done(err)
 
    // respond to request
    res.setHeader('content-type', 'text/plain')
    res.end('hello, world!')
  })
})

app.use(cors())
async function init() {
  try {
    app.listen(3001, () => {
      console.log('Express App Listening on Port 3001');
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
