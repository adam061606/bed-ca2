const pool = require('../services/db');


//check username and email exist yet
module.exports.checkRelExist = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM UserCharRel
    WHERE user_id = ? AND player_id = ?;

    SELECT * FROM User
    WHERE user_id = ?;

    SELECT * FROM Player
    WHERE id = ?;
    `;
    const VALUES = [data.user_id, data.player_id,data.user_id, data.player_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//create new player 
module.exports.insertRel = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO UserCharRel (user_id, player_id)
    VALUES (?, ?)
    `;
    const VALUES = [data.user_id, data.player_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// read all users
module.exports.selectAllRels = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM UserCharRel;
    `;

    pool.query(SQLSTATMENT, callback);
}

// read user by ID
module.exports.selectRelById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM UserCharRel
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// read rel by user_id
module.exports.selectRelByUserID = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM UserCharRel
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


// update rel by ID
module.exports.updateRelById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE UserCharRel 
    SET user_id = ?, player_id = ?
    WHERE id = ?; 
    `;
    const VALUES = [data.user_id, data.player_id, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// delete rel by ID
module.exports.deleteRelById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM UserCharRel
    WHERE id = ?
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}     // ALTER TABLE Player AUTO_INCREMENT = 1;
