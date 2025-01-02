import MySQL from "mysql2";
import dotenv from "dotenv";

dotenv.config()

export const database = MySQL.createConnection({
  host: process.env.DB_HOST,
  port: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

database.connect((err) => {
  if (err) return console.log("Gagal menyambungkan database", err);
  console.log("Database berhasil disambungkan");
});
