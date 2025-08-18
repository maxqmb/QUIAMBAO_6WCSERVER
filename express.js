/*
Quiambao, Maxene P
WD-302
*/
import express from 'express';
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});
const upload = multer({ storage: storage }).fields([{ name: 'file', maxCount: 1 }]);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

/* PAGE ROUTES */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/adminForm', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'adminForm.html'));
});

app.get('/studentForm', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'studentForm.html'));
});

/* API ROUTES */
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


app.post('/postAdmin', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).send('Error uploading file');

    const { adminID, firstName, lastName, department, username } = req.body;

    if (!adminID) {
      return res.status(400).send('Admin ID is required');
    }

    console.log("Admin Data:", { adminID, firstName, lastName, department, username });

    if (req.files && req.files['file']) {
      console.log('Uploaded file:', req.files['file'][0].path);
    } else {
      console.log('No file uploaded');
    }

    res.send('File and form data uploaded successfully');
  });
});


const server = app.listen(5000, () => {
  console.log(`Server running at http://localhost:5000`);
});
