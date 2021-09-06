const express = require('express');
const mongoose = require('mongoose');
const User = require('../Database/User');
const route = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../Middleware/auth');


// post route that will be used to register a new user
route.post('/register', async (req, res) => {
  //crypting the password, that will return a random string. We are doing it 10 times so our password are really secured and ireversible
  bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash // return an hashed password to the Database
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
});

route.post('/login', async (req, res) => {
  User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) { // checking if the user does exists
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password) // using compare function from bcrypt that checks if hashed password and the pasword match !
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign( // return a token created with jsonwebtoken and the id of the user
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' } // the token will expire in 24h
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
});

route.get('/users', auth, async (req, res) => { // to use the users road we need to pass the "auth" function that will checked if there is a token and if it's matches
    try {
      const allUsers = await User.find({}); // return all users from database
      res.json(allUsers);
    } catch (error) {
      res.json(error);
    }
  });

module.exports = route;
