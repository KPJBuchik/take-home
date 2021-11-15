const express = require('express');
const { Agent } = require('./model');
const bodyParser = require('body-parser');
const db = require("./model.js")
const cors = require('cors')

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get('/agents', async (req, res, next) => {
  const agents = await Agent.findAll();
  return res.json(agents);
});


app.post('/agents', function (req, res, next) {
  db.Agent.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    photoUrl: req.body.photoUrl,
    agentLicence: req.body.agentLicence,
    address: req.body.address,
    practiceAreas: req.body.practiceAreas,
    aboutMe: req.body.aboutMe,
    review: req.body.review
  }).then(function (newAgent) {
    next()

    return res.json(newAgent)
  })
});

app.put("/agents/:id", function (req, res) {
  let condition = "id = " + req.params.id;

  db.Agent.update(
    {
      review: req.body.review
    }
  ), condition, function (newReview) {

      res.json(newReview);
    }


});



module.exports = app;

