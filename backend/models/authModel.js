import { database } from '../main/database.js';

export const authModel = {
  findUserByID: (id) => {
    return new Promise((resolve, reject) => {
      const query =
        'select * from users where id = ?';
      database.execute(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  findUserByUsername: (username) => {
    return new Promise((resolve, reject) => {
      const query =
        'select id, display_name, username, email, password from users where username = ?';
      database.execute(query, [username], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  findUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const query =
        'select id, display_name, username, email, password, otp from users where email = ?';
      database.execute(query, [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  findUserWithAllColumnByUsername: (email) => {
    return new Promise((resolve, reject) => {
      const query =
        'select id, display_name, username, email, password, otp from users where email = ?';
      database.execute(query, [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  createAccount: (display_name, username, email, password) => {
    return new Promise((resolve, reject) => {
      const query =
        'insert into users (display_name, username, email, password) values (?, ?, ?, ?)';
      database.execute(
        query,
        [display_name, username, email, password],
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
  createMultipleAccount: (users) => {
    return new Promise((resolve, reject) => {
      const placeholders = users.map(() => '(?, ?, ?, ?)').join(', ');
      const values = users.flat();
      const query = `insert into users (display_name, username, email, password) values ${placeholders}`;
      database.execute(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  createMultipleLink: (users) => {
    return new Promise((resolve, reject) => {
      const placeholders = users.map(() => '(?, ?, ?, ?)').join(', ');
      const values = users.flat();
      const query = `insert into link_collection (user_id, link, description, urls) values ${placeholders}`;
      database.execute(query, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};
