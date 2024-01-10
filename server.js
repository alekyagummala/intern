// server.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Mock database
const skills = [
  { id: 1, name: 'Singing' },
  { id: 2, name: 'Dancing' },
  { id: 3, name: 'Painting' },
  { id: 4, name: 'Roosting' },
];

const users = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/signup/:id', (req, res) => {
  const skillId = parseInt(req.params.id);
  const skill = skills.find(s => s.id === skillId);

  if (!skill) {
    return res.status(404).send('Skill not found');
  }

  res.sendFile(__dirname + `/public/signup_${skill.name.toLowerCase()}.html`);
});

app.post('/signup/:id', (req, res) => {
  const skillId = parseInt(req.params.id);
  const skill = skills.find(s => s.id === skillId);

  if (!skill) {
    return res.status(404).send('Skill not found');
  }

  const { name, email, mobile, gender, location } = req.body;
  const user = { name, email, mobile, gender, location, skill: skill.name };
  users.push(user);

  res.send('Signup successful!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
