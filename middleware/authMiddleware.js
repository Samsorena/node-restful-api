// Hardcoded username and password for demonstration purpose
const USERNAME = process.env.BASIC_AUTH_USERNAME;
const PASSWORD = process.env.BASIC_AUTH_PASSWORD;

// Middleware function to check if the provided username and password are correct
const checkAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Authorization header is required!" });
  }

  const auth = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");
  const username = auth[0];
  const password = auth[1];

  if (username === USERNAME && password === PASSWORD) {
    next();
  } else {
    res.status(401).json({ message: "Invalid username or password!" });
  }
};

module.exports = checkAuth;
