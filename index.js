// Express configuration
const express = require('express');
const app = express();

// Set view engine to ejs
app.set('view engine', 'ejs');
var access_token = "";

// Listen to port 8080
const port = process.env.PORT || 8080;
app.listen(port , () => console.log('App listening on port ' + port));

// Get index page
app.get('/', function(req, res) {
  res.render('pages/index',{client_id: clientID});
});

// Import Axios Library
const axios = require('axios')

// Variables for github client Id and Secret
const clientID = '3603c88870cbfc5cd8be'
const clientSecret = 'aa0c31581ea9a5d249916b3de5b937351141b4ca'

// Declare the callback route
app.get('/github/callback', (req, res) => {
  const requestToken = req.query.code
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
         accept: 'application/json'
    }
  }).then((response) => {
    access_token = response.data.access_token
    res.redirect('/success');
  })
})

// Get success login page
app.get('/success', function(req, res) {

  axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      Authorization: 'token ' + access_token
    }
  }).then((response) => {
    res.render('pages/success',{ userData: response.data });
  })
});