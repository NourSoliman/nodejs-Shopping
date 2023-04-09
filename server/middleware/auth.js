const jwt = require('jsonwebtoken');
const User = require(`../models/User`)


function authenticate(req, res, next) {
    console.log('Request Headers:', req.headers);
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.sendStatus(401);
    }
    const token = authHeader.split(' ')[1];
    console.log('Token:', token);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      User.findById(decoded.userId)
        .then((user) => {
          req.user = user;
          next();
        })
        .catch((err) => {
          res.sendStatus(500);
        });
    });
  }
  
  

module.exports =  authenticate ;
