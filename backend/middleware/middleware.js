// depedencies
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const middleware = {
  protected: async (req, res, next) => {
    // GET refresh cookie
    const REFRESH_TOKEN = req.cookies.REFRESH_TOKEN;

    // validation: check if refresh cookie is exist
    if (!REFRESH_TOKEN)
      return res.json({ success: false, message: "Please login again!" });

    // GET secret cookie
    const SECRET_TOKEN =
      req.cookies.SECRET_TOKEN || (req.headers["authorization"] && req.headers["authorization"].split(" ")[1]);

    // validation: check if secret cookie is exist
    if (!SECRET_TOKEN)
      return res.json({ success: false, message: "Expired token!" });

    // GET real secret token
    const secret_token = process.env.SECRET_TOKEN;

    // verify the secret cookie with secret token
    const verifySecretToken = () => {
      return new Promise((resolve, reject) => {
        jwt.verify(SECRET_TOKEN, secret_token, (err, decode) => {
          if (err) {
            reject(err);
          } else {
            resolve(decode);
          }
        });
      });
    };

    try {
      const payload = await verifySecretToken();

      // Change to array and get the key
      const getKeySecretToken = Object.keys(payload);

      // validation: is it any data on payload ?
      if (getKeySecretToken.length === 0)
        return res.json({ success: false, message: "Expired token!" });

      // SEND the payload to the request next function
      const { user_id, username, display_name, email } = payload;
      req.user_id = user_id;
      req.username = username;
      req.display_name = display_name;
      req.email = email;

      next();
    } catch (err) {
      res.json({ success: false, message: "Server error!" });
    }
  },
  protectedPage: async (req, res) => {
    // GET refresh cookie
    const REFRESH_TOKEN = req.cookies.REFRESH_TOKEN;

    // validation: check if refresh cookie is exist
    if (!REFRESH_TOKEN)
      return res.json({ success: false, message: "Please login again!" });

    // GET secret cookie
    const SECRET_TOKEN =
      req.cookies.SECRET_TOKEN ||
      (req.headers["authorization"]
        ? req.headers["authorization"].startsWith("Bearer ")
          ? req.headers["authorization"].split(" ")[1] // Format "Bearer token123"
          : req.headers["authorization"] // Format "token123"
        : null);

    // validation: check if secret cookie is exist
    if (!SECRET_TOKEN)
      return res.json({ success: false, message: "Expired token!" });

    // GET real secret token
    const secret_token = process.env.SECRET_TOKEN;

    // verify the secret cookie with secret token
    const verifySecretToken = () => {
      return new Promise((resolve, reject) => {
        jwt.verify(SECRET_TOKEN, secret_token, (err, decode) => {
          if (err) {
            reject(err);
          } else {
            resolve(decode);
          }
        });
      });
    };

    try {
      const payload = await verifySecretToken();

      // Change to array and get the key
      const getKeySecretToken = Object.keys(payload);

      // validation: is it any data on payload ?
      if (getKeySecretToken.length === 0)
        return res.json({ success: false, message: "Expired token!" });

      // SUCCESS
      return res.json({ success: true, message: "User is already login!" });
    } catch (err) {
      res.json({ success: false, message: "Server error!" });
    }
  },
  refresh: async (req, res) => {
    // GET refresh token from cookies
    const { REFRESH_TOKEN } = req.cookies;

    // Validation: is it refresh cookie exist?
    if (!REFRESH_TOKEN)
      return res.json({ success: false, message: "Please Login again!" });

    // GET real refresh token
    const refresh_token = process.env.REFRESH_TOKEN;

    const compareRefreshCookie = () => {
      return new Promise((resolve, reject) => {
        jwt.verify(REFRESH_TOKEN, refresh_token, (err, decode) => {
          if (err) {
            reject(err);
          } else {
            resolve(decode);
          }
        });
      });
    };

    try {
      // Get payload from refresh
      const refreshPayload = await compareRefreshCookie();

      // validation if refresh payload is exist
      if (!refreshPayload)
        return res.json({ success: false, message: "Please Login again!" });

      // GET real secret token
      const secret_token = process.env.SECRET_TOKEN;

      // Settings secret payload from refresh payload
      const secretPayload = {
        user_id: refreshPayload.user_id,
        username: refreshPayload.username,
        display_name: refreshPayload.display_name,
        email: refreshPayload.email,
      };

      // Create new token
      const newToken = jwt.sign(secretPayload, secret_token, {
        expiresIn: "15s",
      });

      // Send refresh token
      return res.json({
        success: true,
        message: "Create Request is success",
        results: `Bearer ${newToken}`,
      });
    } catch (error) {
      res.json({
        success: false,
        message: "Server error!",
      });
    }
  },
};

export default middleware