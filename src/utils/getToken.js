const { sign } = require("jsonwebtoken");

// returns a jwt
function getToken(user, key) {
  return sign(
    {
      currentUser: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        status: user.status
      }
    },
    key,
    //{ expiresIn: '365d' }
  );
}

module.exports = getToken;