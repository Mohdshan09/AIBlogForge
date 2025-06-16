import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    jwt.verify(token, process.env.secretKey);
    next();
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Invalid token !" });
  }
};

export default auth;
