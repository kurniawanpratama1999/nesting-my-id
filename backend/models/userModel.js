import { database } from '../main/database.js';

export const userModel = {
  createLink: (user_id, link, description, urls) => {
    return new Promise((resolve, reject) => {
      const query = `
      INSERT INTO link_collection (user_id, link, description, urls) 
      VALUES (?, ?, ?, ?)`;
      database.execute(
        query,
        [user_id, link, description, urls],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
  updateLink: (user_id, link, description, urls) => {
    return new Promise((resolve, reject) => {
      const query = `
      UPDATE link_collection 
      SET description = ?, urls = ?, updated_at = current_timestamp()
      WHERE user_id = ? AND link = ?`;
      database.execute(
        query,
        [description, urls, user_id, link],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
  deleteLink: (user_id, link) => {
    return new Promise((resolve, reject) => {
      const query = `
      DELETE link_collection 
      WHERE user_id = ? AND link = ?`;
      database.execute(query, [user_id, link], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  readLink: (user_id, username) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT
        u.username,
        u.display_name,
        u.email,
        lc.id AS link_id,
        lc.link,
        lc.description,
        JSON_LENGTH(lc.urls) AS total_link,
        lc.created_at,
        lc.updated_at,
        lc.expired_in
        FROM users u
        LEFT JOIN link_collection lc
        ON lc.user_id = u.id
        WHERE u.id = ? AND u.username = ?`;
      database.execute(query, [user_id, username], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  readUrls: (user_id, username, link) => {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT 
      u.username,
      lc.id AS link_id,
      lc.link,
      lc.description,
      lc.urls,
      lc.created_at,
      lc.updated_at,
      lc.expired_in
      FROM users u
      LEFT JOIN link_collection lc
      ON lc.user_id = u.id
      WHERE lc.user_id = ? AND u.username = ? AND lc.link = ?`;
      database.execute(query, [user_id, username, link], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  changeUsername: (user_id, oldUsername, newUsername) => {
    return new Promise((resolve, reject) => {
      const query = `
          UPDATE users
          SET username = ?, updated_at = current_timestamp()
          WHERE id = ? AND username = ?`;
      database.execute(
        query,
        [newUsername, user_id, oldUsername],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
  changePassword: (user_id, email, newPassword) => {
    return new Promise((resolve, reject) => {
      const query = `
          UPDATE users
          SET password = ?, updated_at = current_timestamp()
          WHERE id = ? AND email = ?`;
      database.execute(
        query,
        [newPassword, user_id, email],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
  changeEmail: (user_id, oldEmail, newEmail) => {
    return new Promise((resolve, reject) => {
      const query = `
          UPDATE users
          SET email = ?, updated_at = current_timestamp()
          WHERE id = ? AND email = ?`;
      database.execute(query, [newEmail, user_id, oldEmail], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  changeDisplayName: (user_id, oldDisplayName, newDisplayName) => {
    return new Promise((resolve, reject) => {
      const query = `
          UPDATE users
          SET display_name = ?, updated_at = current_timestamp()
          WHERE id = ? AND display_name = ?`;
      database.execute(
        query,
        [newDisplayName, user_id, oldDisplayName],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
  changeOTP: (newOTP, email) => {
    return new Promise((resolve, reject) => {
      const query = `
          UPDATE users
          SET otp = ?, updated_at = current_timestamp()
          email = ?`;
      database.execute(query, [newOTP, email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  readOTP: (email, OTP) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT otp FROM users
        WHERE email = ? AND otp = ?`;
      database.execute(query, [email, OTP], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};
