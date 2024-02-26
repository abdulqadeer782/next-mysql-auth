const mysql = require('mysql2/promise');

require('dotenv').config();

const config = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
};

const pool = mysql.createPool(config);

module.exports = {
    async connectToDatabase() {
        try {
            const connection = await pool.getConnection();
            return connection;
        } catch (error) {
            console.error('Error connecting to MySQL database:', error);
            throw error; // Re-throw to handle in a higher-level function
        }
    },
}
