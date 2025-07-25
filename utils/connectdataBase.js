import mysql from "mysql2";
export const DB = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "weektodo",
});

export const connectDB = async () => {
  try {
    await DB.connect();
    console.log("connect to db successfully");
  } catch (err) {
    console.error("Error connecting to DB", err);
  }
};
