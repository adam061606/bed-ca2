const pool = require('../services/db');

module.exports.selectAll = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT Messages.id, Messages.message_text, User.user_id, User.username, Messages.created_at , IF(User.user_id = ?,TRUE,FALSE) AS own_message FROM Messages
    INNER JOIN User ON Messages.user_id = User.user_id
    ORDER BY Messages.created_at;
    `;

    const VALUES = [data.id];

    // SELECT * from Messages 
    // INNER JOIN user ON user.user_id = Messages.user_id;

    pool.query(SQLSTATMENT,VALUES, callback);
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Messages
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Messages (message_text, user_id)
    VALUES (?, ?);
    `;
    const VALUES = [data.message_text, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Messages 
    SET message_text = ?, user_id = ?
    WHERE id = ?;
    `;
    const VALUES = [data.message_text, data.user_id, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Messages 
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}
