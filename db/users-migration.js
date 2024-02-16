const { connectToDatabase } = require('./dbConfig');

connectToDatabase().then((con) => {
    con.query(
        `CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            email_verification_code VARCHAR(255),
            email_verified BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`
    )
        .then(() => console.log("users table created successfully."))
        .catch((err) => console.log(err))
})
