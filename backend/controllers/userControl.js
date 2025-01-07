import { userModel } from "../models/userModel.js";
import { authModel } from "../models/authModel.js";
import randomLinkGenerator from "../utils/randomLinkGenerator.js";
import { passwordRegex } from "../regexs/passwordRegex.js";
import { emailRegex } from "../regexs/emailRegex.js";
import transporter from "../middleware/smtp.js";

// DEPENDENCIES
import bcrpyt from "bcryptjs";
import dotenv from 'dotenv'

dotenv.config()

export const userControl = {
  createLink: async (req, res) => {
    const { description, urls } = req.body;

    // Description Validation: Find the description
    if (!description)
      return res.json({ success: false, message: "Description cannot find!" });

    if (description.length < 25)
      return res.json({
        success: false,
        message: "Description at least 25 characters!",
      });

    if (description.length > 200)
      return res.json({
        success: false,
        message: "Description at least max 200 characters!",
      });

    // Urls Validation: Find the urls
    if (!urls)
      return res.json({ success: false, message: "Urls cannot find!" });

    let counterArray = 0;
    const findEmptyUrls = () => {
      const getArray = urls[counterArray];
      const groupCount = counterArray + 1;
      if (getArray.id === "") return `Group ${groupCount} of ID cannot empty!`;

      if (getArray.logo.trim() === "")
        return `Group ${groupCount} of Logo cannot empty!`;

      if (getArray.details.trim() === "")
        return `Group ${groupCount} of Details cannot empty!`;

      if (getArray.url.trim() === "")
        return `Group ${groupCount} of Url cannot empty!`;

      if (counterArray + 1 === urls.length) return false;

      counterArray += 1;
      return findEmptyUrls();
    };

    const isEmptyUrls = findEmptyUrls();

    if (isEmptyUrls) {
      return res.json({ success: false, message: isEmptyUrls });
    }

    // Variable
    const user_id = req.user_id;
    const randomLink = randomLinkGenerator();

    // Insert to link_collection table
    try {
      const insert = await userModel.createLink(
        user_id,
        randomLink,
        description,
        urls
      );

      // Validation: check if any changes in row of link_collection table
      if (insert.affectedRows === 0)
        return res.json({
          success: false,
          message: "There are something wrong!",
        });

      //  SUCCESS
      return res.json({ success: true, message: "Insert URls is Success" });
    } catch (error) {
      return res.json({
        success: false,
        message: "Create Is Error. Try Again Later!",
      });
    }
  },
  updateLink: async (req, res) => {
    const { userLink } = req.params;
    const { description, urls } = req.body;
    const { user_id } = req;
    try {
      const findUser = await authModel.findUserByID(user_id);

      if (findUser.length === 0)
        return res.json({ success: false, message: "UserID cannot be find!" });

      // Link Validation: Find the Link
      if (!userLink)
        return res.json({ success: false, message: "Link cannot be find!" });

      // Description Validation: Find the description
      if (!description)
        return res.json({
          success: false,
          message: "Description cannot be find!",
        });

      if (description.length < 25)
        return res.json({
          success: false,
          message: "Description at least 25 characters!",
        });

      if (description.length > 200)
        return res.json({
          success: false,
          message: "Description at least max 200 characters!",
        });

      // Urls Validation: Find the urls
      if (!urls)
        return res.json({
          success: false,
          message: "Urls cannot be find!",
        });

      let counterArray = 0;
      const findEmptyUrls = () => {
        const getArray = urls[counterArray];
        const groupCount = counterArray + 1;
        if (getArray.id === "")
          return `Group ${groupCount} of ID cannot empty!`;

        if (getArray.logo.trim() === "")
          return `Group ${groupCount} of Logo cannot empty!`;

        if (getArray.details.trim() === "")
          return `Group ${groupCount} of Details cannot empty!`;

        if (getArray.url.trim() === "")
          return `Group ${groupCount} of Url cannot empty!`;

        if (counterArray + 1 === urls.length) return false;

        counterArray += 1;
        return findEmptyUrls();
      };

      const isEmptyUrls = findEmptyUrls();

      if (isEmptyUrls) {
        return res.json({ success: false, message: isEmptyUrls });
      }

      // Insert to link_collection table
      const insert = await userModel.updateLink(
        user_id,
        userLink,
        description,
        urls
      );

      // Validation: check if any changes in row of link_collection table
      if (insert.affectedRows === 0)
        return res.json({
          success: false,
          message: "There are something wrong!",
        });

      //  SUCCESS
      return res.json({ success: true, message: "Insert URls is Success" });
    } catch (error) {
      return res.json({
        success: false,
        message: "Update Link is Error, Try Again Later!",
      });
    }
  },
  deleteLink: async (req, res) => {
    const { link } = req.body;

    // Link Validation: Find the Link
    if (!link)
      return res.json({ success: false, message: "Link cannot be find!" });

    // Variable
    const user_id = req.id;

    try {
      // EXECUTE
      const deleteRow = await userModel.deleteLink(user_id, link);

      // Validation: check if any changes in row of link_collection table
      if (deleteRow.affectedRows === 0)
        return res.json({
          success: false,
          message: "There are something wrong!",
        });

      //  SUCCESS
      return res.json({ success: true, message: "Delete link is Success" });
    } catch (error) {
      return res.json({
        success: false,
        message: "Delete link is Error, Try again later!",
      });
    }
  },
  readLink: async (req, res) => {
    // Variable
    const { user_id } = req;

    try {
      const findUser = await authModel.findUserByID(user_id);

      if (findUser.length === 0)
        return res.json({ success: false, message: "UserID cannot be find!" });

      // EXECUTE
      let getLink = await userModel.readLink(user_id, findUser[0].username);

      // Validation: Check is data exist
      if (getLink.length === 0)
        return res.json({
          success: false,
          message: "Cannot find your link!",
        });

      return res.json({
        success: true,
        message: "Get link is success",
        results: {
          display_name: findUser[0].display_name,
          username: findUser[0].username,
          email: findUser[0].email,
          urls: getLink.map((val) => ({
            link_id: val.link_id,
            link: val.link,
            description: val.description,
            total_link: val.total_link,
            create_at: val.create_at,
            updated_at: val?.updated_at?.toLocaleDateString("id") || null,
            expired_in: val?.expired_in?.toLocaleDateString("id") || null,
          })),
        },
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Read link is Error, Try again later!",
      });
    }
  },
  readUrls: async (req, res) => {
    // Variable
    const { user_id } = req;

    try {
      const findUser = await authModel.findUserByID(user_id);

      if (findUser.length === 0)
        return res.json({ success: false, message: "UserID cannot be find!" });

      if (findUser[0].id !== user_id)
        return res.json({ success: false, message: "UserID not same!" });

      const { userLink } = req.params;

      // EXECUTE
      const getUrls = await userModel.readUrls(
        user_id,
        findUser[0].username,
        userLink
      );

      // Validation: Check is data exist
      if (getUrls.length === 0 || !getUrls)
        return res.json({
          success: false,
          message: "Cannot find your link!",
        });

      setTimeout(() => {
        return res.json({
          success: true,
          message: "Get link is success",
          results: {
            ...getUrls[0],
            urls: JSON.parse(getUrls[0].urls),
            created_at: getUrls[0].created_at.toLocaleDateString("id"),
            updated_at: getUrls[0].updated_at.toLocaleDateString("id"),
            expired_in: getUrls[0].expired_in.toLocaleDateString("id"),
          },
        });
      }, 2000);
    } catch (error) {
      return res.json({
        success: false,
        message: "Read urls is Error, Try again later!",
      });
    }
  },
  changeUsername: async (req, res) => {
    // Get id and username From SECRET TOKEN
    const { user_id } = req;
    try {
      const findUser = await authModel.findUserByID(user_id);

      if (findUser.length === 0)
        return res.json({ success: false, message: "UserID cannot be find!" });

      if (findUser[0].id !== user_id)
        return res.json({ success: false, message: "UserID not same!" });

      // GET from body
      const { oldUsername, newUsername } = req.body;

      // Validation: check oldUsername and username is Match
      if (oldUsername.toLowerCase() !== findUser[0].username.toLowerCase())
        return res.json({
          success: false,
          message: "Old username is do not match!",
        });

      // Validation oldUsername
      if (!oldUsername)
        return res.json({
          success: false,
          message: "old username cannot be empty!",
        });

      if (!newUsername)
        return res.json({
          success: false,
          message: "new username cannot be empty!",
        });

      // validation: Is new username is exist
      const findUsername = await authModel.findUserByUsername(newUsername);

      if (findUsername.length !== 0) {
        return res.json({
          success: false,
          message: "username is taken!",
        });
      }

      // EXECUTE For change
      const updateUsername = await userModel.changeUsername(
        user_id,
        oldUsername.toLowerCase(),
        newUsername.toLowerCase()
      );

      // validation: check is any changes in row of users table
      if (updateUsername.affectedRows === 0)
        return res.json({
          success: false,
          message: "There is something wrong!",
        });

      return res.json({
        success: true,
        message: "Update username is success!",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Change Username is Error, Try again later!",
      });
    }
  },
  changePassword: async (req, res) => {
    // Get id and email From SECRET TOKEN
    const { user_id } = req;
    try {
      const findUser = await authModel.findUserByID(user_id);

      if (findUser.length === 0)
        return res.json({ success: false, message: "UserID cannot be find!" });

      if (findUser[0].id !== user_id)
        return res.json({ success: false, message: "UserID not same!" });

      // GET from body
      const { email, newPassword } = req.body;

      // Validation oldEmail
      if (!email)
        return res.json({
          success: false,
          message: "email cannot be empty!",
        });

      // Validation: check Email and Email from id is Match
      if (email !== findUser[0].email)
        return res.json({
          success: false,
          message: "email is do not match!",
        });

      if (!newPassword)
        return res.json({
          success: false,
          message: "new password cannot be empty!",
        });

      // Confirm password Regex
      if (passwordRegex(newPassword) === false)
        return res.json({
          success: false,
          message: "Confirm Password invalid",
        });

      const salt = bcrpyt.genSaltSync();
      const convertPassword = bcrpyt.hashSync(newPassword, salt);

      // EXECUTE For change
      const updatePassword = await userModel.changePassword(
        user_id,
        email,
        convertPassword
      );

      // validation: check is any changes in row of users table
      if (updatePassword.affectedRows === 0)
        return res.json({
          success: false,
          message: "There is something wrong!",
        });

      return res.json({
        success: true,
        message: "Update Password is success!",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Update Password is Error, Try again later!",
      });
    }
  },
  changeEmail: async (req, res) => {
    // Get id and email From SECRET TOKEN
    const { user_id } = req;
    try {
      const findUser = await authModel.findUserByID(user_id);

      if (findUser.length === 0)
        return res.json({ success: false, message: "UserID cannot be find!" });

      if (findUser[0].id !== user_id)
        return res.json({ success: false, message: "UserID not same!" });

      // GET from body
      const { oldEmail, newEmail } = req.body;

      // Validation: check oldEmail and Email is Match
      if (oldEmail !== findUser[0].email)
        return res.json({
          success: false,
          message: "Old email is do not match!",
        });

      // Validation oldEmail
      if (!oldEmail)
        return res.json({
          success: false,
          message: "old email cannot be empty!",
        });

      if (!newEmail)
        return res.json({
          success: false,
          message: "new email cannot be empty!",
        });

      // validation: Is new Email is exist
      const findEmail = await authModel.findUserByEmail(newEmail);

      if (findEmail.length !== 0) {
        return res.json({
          success: false,
          message: "Email is taken!",
        });
      }

      // EXECUTE For change
      const updateEmail = await userModel.changeEmail(
        user_id,
        oldEmail.toLowerCase(),
        newEmail.toLowerCase()
      );

      // validation: check is any changes in row of users table
      if (updateEmail.affectedRows === 0)
        return res.json({
          success: false,
          message: "There is something wrong!",
        });

      return res.json({ success: true, message: "Update email is success!" });
    } catch (error) {
      return res.json({
        success: false,
        message: "Change Email is Error, Try again later!",
      });
    }
  },
  changeDisplayName: async (req, res) => {
    // Get id and username From SECRET TOKEN
    const { user_id } = req;
    try {
      const findUser = await authModel.findUserByID(user_id);

      if (findUser.length === 0)
        return res.json({ success: false, message: "UserID cannot be find!" });

      if (findUser[0].id !== user_id)
        return res.json({ success: false, message: "UserID not same!" });

      // GET from body
      const { oldDisplayName, newDisplayName } = req.body;

      // Validation oldUsername
      if (!oldDisplayName)
        return res.json({
          success: false,
          message: "old display name cannot be empty!",
        });

      if (oldDisplayName !== findUser[0].display_name)
        return res.json({
          success: false,
          message: "old display name is not same!",
        });

      if (!newDisplayName)
        return res.json({
          success: false,
          message: "new display name cannot be empty!",
        });

      // EXECUTE For change
      const updateDisplayName = await userModel.changeDisplayName(
        user_id,
        oldDisplayName,
        newDisplayName
      );

      // validation: check is any changes in row of users table
      if (updateDisplayName.affectedRows === 0)
        return res.json({
          success: false,
          message: "There is something wrong!",
        });

      return res.json({
        success: true,
        message: "Update display name is success!",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Change Display Name is Error, Try again later!",
      });
    }
  },
  checkEmailAndSendOtp: async (req, res) => {
    const { email } = req.body;

    if (!email)
      return res.json({ success: false, message: "Email cannot be empty" });

    if (emailRegex(email) === false)
      return res.json({ success: false, message: "Email is not valid" });

    try {
      // RANDOM generator 6 until 10 characters
      const newOTP = randomLinkGenerator();

      const findUser = await authModel.findUserByEmail(email);

      if (findUser.length === 0)
        return res.json({ success: false, message: "Email cannot be find!" });

      // Execute update otp
      const updateOTP = await userModel.changeOTP(newOTP, findUser[0].email);

      // validation check if any changes in row of users table
      if (updateOTP.affectedRows === 0)
        return res.json({
          success: false,
          message: "Update OTP is failed!",
        });

        
        const salt = bcrpyt.genSaltSync();
        const convertEmail = bcrpyt.hashSync(email, salt);
      const convertOtp = bcrpyt.hashSync(newOTP, salt);

      res
        .cookie("EMAIL", convertEmail, {
          httpOnly: true,
          secure: false,
          sameSite: "Strict",
        })
        .cookie("OTP", convertOtp, {
          httpOnly: true,
          secure: false,
          sameSite: "Strict",
          maxAge: 1000 * 60 * 2,
        });

        const sendOtpToEmail = await transporter.sendMail({
          from: process.env.SMTP_EMAIL,
          to: email,
          subject: "OTP code from nesting.my.id for change password",
          text: `Hai ${findUser[0].display_name}, this is your otp code: ${newOTP}.`,
        });
        
      return res.json({
        success: true,
        message: "Email is correct OTP was send to your email!",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Server Error!",
      });
    }
  },
  removeOTP: async (req, res) => {
    const emailCookie = req.cookies.EMAIL;
    const emailInput = req.body.email;

    if (!emailCookie || !emailInput)
      return res.json({ success: false, message: "Email not found!" });

    const compareEmail = bcrpyt.compareSync(emailInput, emailCookie);

    if (!compareEmail)
      return res.json({ success: false, message: "Email do not match!" });

    try {
      const findUser = await authModel.findUserByEmail(emailInput);

      if (findUser.length === 0)
        return res.json({ success: false, message: "Email cannot be find!" });

      // Execute update otp
      const updateOTP = await userModel.changeOTP("", findUser[0].email);

      // validation check if any changes in row of users table
      if (updateOTP.affectedRows === 0)
        return res.json({
          success: false,
          message: "Update OTP is failed!",
        });

      res.clearCookie("OTP", {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
      });

      return res.json({
        success: true,
        message: "Remove otp is success!",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Server Error!",
      });
    }
  },
  checkOTP: async (req, res) => {
    const otpInput = req.body.otp;
    const otpCookie = req.cookies.OTP;

    const emailInput = req.body.email;
    const emailCookie = req.cookies.EMAIL;
    if (!otpInput || !otpCookie || !emailInput || !emailCookie)
      return res.json({ success: false, message: "Cannot be empty!" });

    if (emailRegex(emailInput) === false)
      return res.json({ success: false, message: "Email is not valid!" });

    const compareEmail = bcrpyt.compareSync(emailInput, emailCookie);
    const compareOtp = bcrpyt.compareSync(otpInput, otpCookie);

    if (!compareEmail || !compareOtp)
      return res.json({ success: false, message: "otp or email not match!" });

    try {
      const findUser = await userModel.readOTP(emailInput, otpInput);

      if (findUser.length === 0)
        return res.json({ success: false, message: "Wrong otp or email!" });

      return res.json({
        success: true,
        message: "OTP is correct!",
      });
    } catch (error) {
      return res.json({
        success: true,
        message: "OTP is correct!",
      });
    }
  },
  checkPassword: async (req, res) => {
    const { password, confirm_password } = req.body;
    const emailInput = req.body.email;
    const emailCookie = req.cookies.EMAIL;
    try {
      if (!emailInput)
        return res.json({ success: false, message: "Email not found!" });

      const compareEmail = bcrpyt.compareSync(emailInput, emailCookie);
      if (!compareEmail)
        return res.json({ success: false, message: "Email not match!" });

      if (!emailRegex(emailInput))
        return res.json({ success: false, message: "Email not valid" });

      if (!password)
        return res.json({ success: false, message: "Password not found" });

      if (!passwordRegex(password))
        return res.json({ success: false, message: "Password not valid" });

      if (!confirm_password)
        return res.json({
          success: false,
          message: "confirm password not found",
        });

      if (!passwordRegex(confirm_password))
        return res.json({
          success: false,
          message: "confirm password not valid",
        });

      if (password !== confirm_password)
        return res.json({
          success: false,
          message: "Password and confirm password not match",
        });

      const salt = bcrpyt.genSaltSync();
      const convertPassword = bcrpyt.hashSync(password, salt);

      const execute = await userModel.changePasswordWhenForgot(
        emailInput,
        convertPassword
      );

      if (execute.affectedRows === 0)
        return res.json({
          success: false,
          message: "Change password is failed!",
        });

      return res.json({
        success: true,
        message: "Change password is success!",
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Server error!",
      });
    }
  },
};
