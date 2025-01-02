import { database } from '../main/database.js';

export const allModel = {
  readUrls: (username, link) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT 
        u.username,
        lc.id AS link_id,
        lc.description,
        lc.urls
        FROM users u
        LEFT JOIN link_collection lc
        ON u.id = lc.user_id
        WHERE u.username = ? AND lc.link = ?`;

      database.execute(query, [username, link], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};
