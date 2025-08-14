import sqlite3 from 'sqlite3';

// باز کردن یا ایجاد دیتابیس
const db = new sqlite3.Database('./database.db');

// ساخت جدول اگر وجود نداشته باشد
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS investors (
        name TEXT PRIMARY KEY,
        units REAL
    )`);
});

export default db;
