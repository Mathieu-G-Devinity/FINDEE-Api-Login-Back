const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try { // Use to check the Token sent from the client. It takes the authorization key of the header that contains our TOKEN.
    //and compares with function verify from jsonwebtoken
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    // it also compares the id of the user
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};