const pool = require('../services/db');

// create user and select user to display new user
module.exports.createUser = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO User (username, email, password)
    VALUES (?, ?, ?);

    SELECT * FROM User 
    WHERE user_id = LAST_INSERT_ID();
    `;
    const VALUES = [data.username, data.email, data.password];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// check username and email exists or not
module.exports.checkUsernameEmail = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE username = ?;

    SELECT * FROM User
    WHERE email = ?
    `;
    const VALUES = [data.username, data.email];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// check if user id exists
module.exports.checkUserID = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// get/display all users
module.exports.getAllUsers = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    `;

    pool.query(SQLSTATMENT, callback);
}

// get task progress of selected user 
module.exports.getTaskProgress = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM TaskProgress
    WHERE user_id = ?
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// get/display user details
module.exports.getUserByID = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;
    `;
    // SELECT IFNULL(SUM(points),0) AS total_points FROM Task
    // WHERE task_id in (?);
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// get/display by id 
module.exports.displayPutUser = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// read user by ID
module.exports.selectUserById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// read user by email
module.exports.selectUserByEmail = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE email = ?;
    `;
    const VALUES = [data.email];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// read user by username
module.exports.selectUserByUsername = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE username = ?;
    `;
    const VALUES = [data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// update a user's information
module.exports.updateUser = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE User
    SET username = ?, email = ? 
    WHERE user_id = ?
    `;
    const VALUES = [data.username,data.email,data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// delete user by id 
module.exports.deleteUserId = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM User
    WHERE user_id = ?;

    DELETE FROM TaskProgress
    WHERE user_id = ?
    `;
    const VALUES = [data.id, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}