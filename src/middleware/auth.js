const jwt = require("jsonwebtoken");
const SECRETE_KEY = process.env.SECRETE_KEY;
const { getAdmin } = require("../controllers/userscontroller");

// verify if a user has token and is valid
module.exports.isLoggedIn = (req, res, next) => {
  let token = req.headers["authorization"] || req.headers["x-access-token"];

  if (token && token.startsWith("Bearer")) token = token.slice(7);
  if (!token)
    return res.status(401).send({ status_code: 401, message: "unauthorized" });

    try {

      const decode = jwt.verify(token, SECRETE_KEY);

      req.user = decode;

      next();
    } catch (error) {
      return res
        .status(401)
        .send({
          status_code: 401,
          message: "Your token has expired, login again"
        });
      }
};
// verify if user is admin
module.exports.isAdmin = async (req, res, next) => {
  let token = req.headers["authorization"] || req.headers["x-access-token"];
  if (token && token.startsWith("Bearer")) {
    token = token.slice(7);
  }
  if (!token)
    return res.status(401).send({ status_code: 401, message: "unauthorized" });
  const { currentUser } = jwt.decode(token);
  const admin = await getAdmin(currentUser._id);

  if (!admin)
    return res.status(401).send({ status_code: 401, message: "unauthorized" });
  next();
};
