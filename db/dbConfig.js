const mysql = require('mysql2/promise');

const config = {
    host: process.env.MYSQL_HOST || '127.0.0.1', // Fallback to localhost if env var not defined
    port: process.env.MYSQL_PORT || 3306, // Fallback to standard port if env var not defined
    database: process.env.MYSQL_DATABASE || 'next-mysql', // Fallback to default database name
    user: process.env.MYSQL_USER || 'root', // Fallback to root user if env var not defined
    password: process.env.MYSQL_PASSWORD || '', // Use empty string for development (not recommended for production)
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
