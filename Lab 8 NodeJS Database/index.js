const express = require('express'); 
const app = express();
app.get('/', function(req, res){
   res.send("Hello world!");
});
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/form', function(req, res){
   res.sendFile(__dirname + "/form.html");
});
 
// Serves the new account form
app.get('/new', function(req, res){
  res.sendFile(__dirname + "/form.html");
});

// Handle form submissions from /insert
app.post('/insert', function(req, res){
  const username = (req.body.username || '').trim();
  const password = (req.body.password || '').trim();
  const email = (req.body.email || '').trim();

  // Validation
  if (!email || !username || !password) {
    return res.status(400).send('Missing email, username, or password');
  }

  
  const sql = 'INSERT INTO Users (Username, Password, Email) VALUES (?, ?, ?)';
  const params = [username, password, email];

  conn.query(sql, params, function(err, result){
    if (err) {
      console.error('DB insert error:', err);
      return res.status(500).send('Error creating account');
    }

    console.log('Inserted new user id=', result.insertId, 'username=', username);
    res.send(`<!doctype html><html><head><meta charset="utf-8"><title>Account Created</title></head><body><h1>Account Created</h1><p>Username: ${username}</p><p>Email: ${email}</p><p>User ID: ${result.insertId}</p><p><a href="/">Home</a> | <a href="/forgot">Forgot Password?</a></p></body></html>`);
  });
});


app.get('/forgot', function(req, res){
  res.sendFile(__dirname + '/forgot.html');
});

// Handle retrieve post: lookup by email and return username/password
app.post('/retrieve', function(req, res){
  const email = (req.body.email || '').trim();
  if (!email) return res.status(400).send('Missing email');

  const sql = 'SELECT Username, Password FROM Users WHERE Email = ? LIMIT 1';
  conn.query(sql, [email], function(err, results){
    if (err) {
      console.error('DB retrieve error:', err);
      return res.status(500).send('Error retrieving account');
    }
    if (!results || results.length === 0) {
      return res.send(`No account found for email: ${email}`);
    }
    const row = results[0];
    res.send(`<!doctype html><html><head><meta charset=\"utf-8\"><title>Account Retrieved</title></head><body><h1>Account Information</h1><p>Username: ${row.Username}</p><p>Password: ${row.Password}</p><p><a href=\"/\">Home</a></p></body></html>`);
  });
});
app.listen(8080);
const mysql = require('mysql');
require('dotenv').config();               
const conn = mysql.createConnection({
  host: "mysql1-p2.ezhostingserver.com",
  database: "citdemo",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});
conn.connect((err) => {           
  if (err) throw err;
  console.log("Connected!");
});