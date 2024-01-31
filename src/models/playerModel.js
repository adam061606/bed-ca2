const pool = require('../services/db');

//create new player 
module.exports.insertPlayer = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Player (name, level, PlayType, partner, specialty, racket, shoe, shirt, pants)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const VALUES = [data.name, data.level, data.PlayType, data.partner, data.specialty, data.racket, data.shoe, data.shirt, data.pants];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// read all players
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Player;
    `;

    pool.query(SQLSTATMENT, callback);
}

// read player by ID
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Player
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// read Player by Name
module.exports.selectPlayerByName = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Player
    WHERE name = ?;
    `;
    const VALUES = [data.name];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// update player 
module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Player 
    SET name = ?, level = ?, specialty = ?, racket = ?, shoe = ?, shirt = ?, pants = ?
    WHERE id = ?;
    `;
    const VALUES = [data.name, data.level, data.specialty, data.racket, data.shoe, data.shirt, data.pants, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// delete player by ID
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Player 
    WHERE id = ?;

    DELETE FROM UserCharRel
    WHERE player_id = ? 
    `;
    const VALUES = [data.id,data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}     // ALTER TABLE Player AUTO_INCREMENT = 1;
