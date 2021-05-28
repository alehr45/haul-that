const jwt = require("jsonwebtoken");

// set token secret and expiration date
const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    console.log(token)

    // separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    // if no token, return request object as is
    if (!token) {
      return req;
    }

    try {
      // decode and attach user data to request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      console.log(data)
      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    // return updated request object
    return req;
  },
  signToken: function ({ email, _id }) {
    const payload = { email, _id };

    console.log(payload)

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};
