const express = require('express');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Temporary Data
let users = [
  {
    id: 1,
    name: "Ravindra",
    age: 22
  },
  {
    id: 2,
    name: "Kamal",
    age: 25,
  } 
  
];

// =====================================
// HOME ROUTE
// =====================================
app.get('/', (req, res) => {
  res.send('Express API Running Successfully');
});

// =====================================
// GET ALL USERS
// =====================================
app.get('/users', (req, res) => {
  res.status(200).json({
    success: true,
    data: users
  });
});

// =====================================
// GET SINGLE USER
// =====================================
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User Not Found'
    });
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// =====================================
// CREATE USER
// =====================================
app.post('/users', (req, res) => {
  const { name, age } = req.body || {};

  if (!name || !age) {
    return res.status(400).json({
      message: "Send name and age in JSON body"
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    age
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser
  });
});

// =====================================
// UPDATE USER
// =====================================
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: 'User Not Found'
    });
  }

  const { name, age } = req.body || {};

  if (!name && !age) {
    return res.status(400).json({
      message: "Send name or age in JSON body"
    });
  }

  user.name = name || user.name;
  user.age = age || user.age;

  res.json({
    message: "Updated Successfully",
    data: user
  });
});

// =====================================
// DELETE USER
// =====================================
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User Not Found'
    });
  }

  users = users.filter((u) => u.id !== id);

  res.status(200).json({
    success: true,
    message: 'User Deleted Successfully'
  });
});

// =====================================
// SERVER
// =====================================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});