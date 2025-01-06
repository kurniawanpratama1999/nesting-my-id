// depedencies
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// self
import { authModel } from "../models/authModel.js";
import { usernameRegex } from "../regexs/usernameRegex.js";
import { passwordRegex } from "../regexs/passwordRegex.js";
import { displayNameRegex } from "../regexs/displayNameRegex.js";
import { emailRegex } from "../regexs/emailRegex.js";

dotenv.config();

export const authControl = {
  login: async (req, res) => {
    const { username, password } = req.body;

    // username validation: cannot be empty
    if (!username)
      return res.json({ success: false, message: "Username cannot be empty!" });

    // password validation: cannot be empty
    if (!password)
      return res.json({ success: false, message: "Password cannot be empty!" });

    // username regex: A-Z || a-z || 0-9 || Dot or Underscore || cannot use space
    if (usernameRegex(username) == false)
      return res.json({
        success: false,
        message:
          "Username cannot contain spaces. Only letters, numbers, dots, and underscores are allowed",
      });

    // password regex: > 8 Character
    if (password.length < 8)
      return res.json({
        success: false,
        message: "Password at least 8 character",
      });

    // password regex: A-Z || a-z || 0-9 || Dot or Underscore
    if (passwordRegex(password) == false)
      return res.json({
        success: false,
        message: "Password invalid! Allowed Symbol is @ $ ! % * ? &",
      });

    // get data user by username
    try {
      const findUser = await authModel.findUserByUsername(username);

      // is user exist ?
      if (findUser.length === 0)
        return res.json({
          success: false,
          message: "Username not found",
        });

      // compare password with the hashing
      const comparePassword = await bcrypt.compare(
        password,
        findUser[0].password
      );

      // is password match
      if (comparePassword === false)
        return res.json({
          success: false,
          message: "Wrong Password!",
        });

      // create payload for jwt
      const payload = {
        user_id: findUser[0].id,
        username: findUser[0].username,
        display_name: findUser[0].display_name,
        email: findUser[0].email,
      };

      // get secret and refresh env
      const secret_token = process.env.SECRET_TOKEN;
      const refresh_token = process.env.REFRESH_TOKEN;

      // encoding token
      const encode_secret_token = jwt.sign(payload, secret_token, {
        expiresIn: "15s",
      });
      const encode_refresh_token = jwt.sign(payload, refresh_token, {
        expiresIn: "6h",
      });

      // sending cookie
      res
        .cookie("SECRET_TOKEN", encode_secret_token, {
          httpOnly: true,
          secure: false,
          sameSite: "Strict",
          maxAge: 1000 * 15, // 15 Seconds
        })
        .cookie("REFRESH_TOKEN", encode_refresh_token, {
          httpOnly: true,
          secure: false,
          sameSite: "Strict",
          maxAge: 1000 * 60 * 60 * 6, // 6 Hours
        });

      // SUCCESS LOGIN
      setTimeout(() => {
        return res.json({
          success: true,
          message: `${findUser[0].username} Berhasil Login`,
        });
      }, 3000);
    } catch (error) {
      return res.json({
        success: false,
        message: "Login is Error, Try again later!",
      });
    }
  },

  register: async (req, res) => {
    const { display_name, username, email, password, confirm_password } =
      req.body;

    // Display name validation: cannot be empty
    if (!display_name)
      return res.json({
        success: false,
        message: "Display name cannot be empty!",
      });

    // Username validation: cannot be empty
    if (!username)
      return res.json({
        success: false,
        message: "Username cannot be empty!",
      });

    // Email validation: cannot be empty
    if (!email)
      return res.json({
        success: false,
        message: "Email cannot be empty!",
      });

    // Password validation: cannot be empty
    if (!password)
      return res.json({
        success: false,
        message: "Password cannot be empty!",
      });

    // Confirm Password validation: cannot be empty
    if (!confirm_password)
      return res.json({
        success: false,
        message: "Confirm Password cannot be empty!",
      });

    // Display Name Regex
    if (displayNameRegex(display_name) === false)
      return res.json({
        success: false,
        message: "Display Name invalid",
      });

    // Username Regex
    if (usernameRegex(username) === false)
      return res.json({
        success: false,
        message: "Username invalid",
      });

    // email Regex
    if (emailRegex(email) === false)
      return res.json({
        success: false,
        message: "Email invalid",
      });

    // password Regex
    if (passwordRegex(password) === false)
      return res.json({
        success: false,
        message: "Password invalid",
      });

    // Confirm password Regex
    if (passwordRegex(confirm_password) === false)
      return res.json({
        success: false,
        message: "Confirm Password invalid",
      });

    // is match between Password and Confirm Password
    if (password !== confirm_password)
      return res.json({
        success: false,
        message: "Confirm Password invalid",
      });

    try {
      // Find User By Username and Check is user exist
      const findUserByUsername = await authModel.findUserByUsername(username);

      if (findUserByUsername.length !== 0)
        return res.json({
          success: false,
          message: "Username is already use",
        });

      // Find User By Email and Check is user exist
      const findUserByEmail = await authModel.findUserByEmail(email);
      if (findUserByEmail.length !== 0)
        return res.json({
          success: false,
          message: "Email is already register",
        });

      // Convert password into bcrypt
      const salt = await bcrypt.genSalt();
      const convertPassword = await bcrypt.hash(password, salt);

      // INSERT INTO DATABASE
      const insertIntoUsersTable = await authModel.createAccount(
        display_name,
        username,
        email,
        convertPassword
      );

      // CHECK AFFECTED ROWS
      if (insertIntoUsersTable.affectedRows === 0)
        return res.json({
          success: false,
          message: "Something went wrong: Create account failed",
        });

      return res.json({
        success: true,
        message: "Create account success",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Register is Error, Try again later!",
      });
    }
  },
  logout: async (req, res) => {
    res.clearCookie("SECRET_TOKEN", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    
    res.clearCookie("REFRESH_TOKEN", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });

    return res.json({ success: true, message: "Berhasil Logout" });
  },
  profile: async (req, res) => {
    const { user_id } = req;
    try {
      const findUser = await authModel.findUserByID(user_id);

      if (findUser.length === 0)
        return res.json({ success: false, message: "UserID cannot be find!" });

      if (findUser[0].id !== user_id)
        return res.json({ success: false, message: "UserID not same!" });

      const { display_name, username, email, last_in, created_at } =
        findUser[0];
      const [userEmail, domain] = email.split("@");
      const hiddenUserEmail1 = userEmail.slice(0, 2);
      const hiddenUserEmail2 = userEmail.slice(userEmail.length - 1);
      const mergeHiddenUserEmail = hiddenUserEmail1 + "***" + hiddenUserEmail2;
      const hiddenEmail = mergeHiddenUserEmail + "@" + domain;

      return res.json({
        success: true,
        message: "UserID not same!",
        results: {
          display_name,
          username,
          email: hiddenEmail,
          last_in: last_in.toLocaleDateString("id"),
          join_at: created_at.toLocaleDateString("id"),
        },
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Get Profile is Error, Try again later!",
      });
    }
  },
};
