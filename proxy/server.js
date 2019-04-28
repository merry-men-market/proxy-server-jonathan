const newrelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const morgan = require('morgan');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.locals.newrelic = newrelic;

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// app.use(morgan('dev'));
app.use('/stocks/:id', express.static(path.join(__dirname, 'public')));

app.get('/api/stocks/:id', (req, res) => {
  // http://13.57.217.200:3001/api/hostels/5
  axios.get(`http://localhost:8080/api/stocks/${req.params.id}`)
    .then(function (response) {
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      res.send(error)
    });
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});