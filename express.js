/*
Quiambao, Maxene P
WD-302
*/
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
const __dirname = import.meta.dirname;

const app = express();
app.use(express.static('public'));
const urlEncoderParser = bodyParser.urlEncoderParser({extended: false});

/*PAGE ROUTES*/

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/studentForm', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'studentForm.html'));
});

app.get('/adminForm', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'adminForm.html'));
});

/*API ROUTES*/
app.get('/getHome', (req, res) => {
  const response = { 
    systemName: 'Student Management System',
    status: 'active',
    message: 'Welcome! Choose your portal to get started'
  };
  console.log("Home Data:", response);
  res.json(response);
});

app.get('/getStudent', (req, res) => {
  const { studentID, firstName, lastName, section } = req.query;
  if (!studentID) {
    return res.status(400).send('Student ID is required');
  }
  const response = { studentID, firstName, lastName, section };
  console.log("Student Data:", response);
  res.json(response);
});

app.post('/postAdmin', urlEncoderParser, (req, res) => {
  const { adminID, firstName, lastName, department } = req.query;
  if (!adminID) {
    return res.status(400).send('Admin ID is required');
  }
  const response = { adminID, firstName, lastName, department };
  console.log("Admin Data:", response);
  res.json(response);
});

const server = app.listen(5000, () => {
  console.log(`Server running at http://localhost:5000`);
});