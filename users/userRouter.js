const express = require('express');

const router = express.Router();
const Users = require('./userDb.js');

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => {
    res.status(500).json({error: "Error adding user"});
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  Users.get()
  .then(userArray => {
    res.status(200).json(userArray);
  })
  .catch(err => {
    res.status(500).json({error: "Failed to get users"});
  });

});

router.get('/:id', validateUserId, (req, res) => {
  console.log("req stuff", req.params.id);
  Users.getById(req.params.id)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(err => {
    res.status(500).json({error: "Failed to get user"})
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
  .then(userBit => {
    if (userBit) {
      req.user = userBit;
      next();
    } else {
      res.status(400).json({error: "invalid user id"});
    }
  })
  .catch(err => {
    res.status(500).json({error: "Error fetching user"});
  })
  
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({error: "Missing user data"});
  } else if (!req.body.name) {
    res.status(400).json({error: "Missing required name field"});
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
