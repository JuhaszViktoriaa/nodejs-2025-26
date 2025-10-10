import db from "./database.js";

db.prepare(
  `CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT, userid INTEGER, title TEXT, content TEXT, FOREIGN KEY (userId) REFERENCES users(id))`
).run();

export const getPosts = () => db.prepare("SELECT * FROM posts").all();

export const getPostbyid = (userid) =>db.prepare("SELECT * FROM posts WHERE userid=?").get(userid);
export const savePost = (title, content) =>db.prepare("INSERT INTO posts (title, title, ) VALUES (?, ? , ?)").run(title, title);
export const updatePost = (userid, title) =>db.prepare("UPDATE posts SET title=? WHERE userid=?").run(title, userid);
export const deletePost = (userid) =>db.prepare("DELETE post FROM posts WHERE userid=?").run(userid);