const mysql = require("mysql2")

const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT} = process.env

// membuat koneksi database
const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
})

connection.connect()

export {
    connection
}