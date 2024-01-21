const { dash } = require('pdfkit');
const pool = require('../services/db');

// check that they got the same play type
module.exports.checkPlayerStyle = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT partner, PlayType FROM Player
    WHERE id = ?;

    SELECT partner, PlayType FROM Player
    WHERE id = ?;
    `;
    const VALUES = [data.player1_id,data.player2_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// get equipments for singles
module.exports.getEquipmentNames1 = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT racket, shoe, shirt, pants FROM Player
    WHERE id = ?;

    SELECT racket, shoe, shirt, pants FROM Player
    WHERE id = ?;
    `;
    const VALUES = [data.player1_id,data.player2_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// get equipments for doubles
module.exports.getEquipmentNames2 = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT racket, shoe, shirt, pants FROM Player
    WHERE id = ?;

    SELECT racket, shoe, shirt, pants FROM Player
    WHERE id = ?;

    SELECT racket, shoe, shirt, pants FROM Player
    WHERE id = ?;

    SELECT racket, shoe, shirt, pants FROM Player
    WHERE id = ?;
    `;
    const VALUES = [data.player1_id,  data.player2_id, data.player1Pair_id, data.player2Pair_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// get sum for singles
module.exports.getSum1 = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT IFNULL(SUM(atk),0) AS total_atk, IFNULL(SUM(def),0) AS total_def FROM Shop WHERE name in (?,?,?,?);

    SELECT IFNULL(SUM(atk),0) AS total_atk, IFNULL(SUM(def),0) AS total_def FROM Shop WHERE name in (?,?,?,?);
    `;
    const VALUES = [data.player1_racket,data.player1_shoe,data.player1_pants,data.player1_shirt,data.player2_racket,data.player2_shoe,data.player2_shirt,data.player2_pants];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// get sum for doubles
module.exports.getSum2 = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT IFNULL(SUM(atk),0) AS total_atk,IFNULL(SUM(def),0) AS total_def FROM Shop WHERE name in (?,?,?,?);

    SELECT IFNULL(SUM(atk),0) AS total_atk,IFNULL(SUM(def),0) AS total_def FROM Shop WHERE name in (?,?,?,?);    
    
    SELECT IFNULL(SUM(atk),0) AS total_atk,IFNULL(SUM(def),0) AS total_def FROM Shop WHERE name in (?,?,?,?);

    SELECT IFNULL(SUM(atk),0) AS total_atk,IFNULL(SUM(def),0) AS total_def FROM Shop WHERE name in (?,?,?,?);
    `;
    const VALUES = [data.player1_racket,data.player1_shoe,data.player1_shirt,data.player1_pants,data.player2_racket,data.player2_shoe,data.player2_shirt,data.player2_pants,data.player1Pair_racket,data.player1Pair_shoe,data.player1Pair_shirt,data.player1Pair_pants,data.player2Pair_racket,data.player2Pair_shoe,data.player2Pair_shirt,data.player2Pair_pants];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// insert singles winner and +1 level
module.exports.singlesWinner = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Court (date, player1, player1Pair, player2, player2Pair, winner)
    VALUES(CURRENT_TIMESTAMP,?,NULL,?,NULL,?);

    UPDATE Player
    SET level = level + 1    
    WHERE id = ?;
    `;
    const VALUES = [data.player1, data.player2, data.winner, data.winner]

    pool.query(SQLSTATMENT,VALUES, callback); 
}

// insert drawed singles match
module.exports.singlesDraw = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Court (date, player1, player1Pair, player2, player2Pair, winner)
    VALUES(CURRENT_TIMESTAMP,?,NULL,?,NULL,"Draw");

    `;
    const VALUES = [data.player1, data.player2]

    pool.query(SQLSTATMENT,VALUES, callback); 
}

// insert doubles winner and +1 level for the winning pair
module.exports.doublesWinner = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Court (date, player1, player1Pair, player2, player2Pair, winner)
    VALUES(CURRENT_TIMESTAMP,?,?,?,?,?);

    UPDATE Player
    SET level = level + 1    
    WHERE id = ?;

    UPDATE Player
    SET level = level + 1    
    WHERE id = ?;
    `;
    const VALUES = [data.player1, data.player1Pair, data.player2, data.player2Pair, data.winner, data.winner, data.winnerPair]

    pool.query(SQLSTATMENT,VALUES, callback); 
}

// insert drawed doubles match
module.exports.doublesDraw = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Court (date, player1, player1Pair, player2, player2Pair, winner)
    VALUES(CURRENT_TIMESTAMP,?,?,?,?,"Draw");

    `;
    const VALUES = [data.player1, data.player1Pair, data.player2, data.player2Pair]

    pool.query(SQLSTATMENT,VALUES, callback); 
}

// check court id exists 
module.exports.checkCourtID = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Court
    WHERE id = ?
    `;
    const VALUES = [data.court_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// read all court games
module.exports.getAllCourts = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Court
    `;

    pool.query(SQLSTATMENT, callback);
}


// update court game functions
// update singles winner 
module.exports.updateSinglesWinner = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Court
    SET date = CURRENT_TIMESTAMP, player1 = ?, player1Pair = NULL, player2 = ?, player2Pair = NULL, winner = ?
    WHERE id = ?;

    UPDATE Player
    SET level = level + 1    
    WHERE id = ?;
    `;
    const VALUES = [data.player1, data.player2, data.winner, data.court_id, data.winner]

    pool.query(SQLSTATMENT,VALUES, callback); 
}

// update singles draw
module.exports.updateSinglesDraw = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Court
    SET date = CURRENT_TIMESTAMP, player1 = ?, player1Pair = NULL, player2 = ?, player2Pair = NULL, winner = "Draw"
    WHERE id = ?;
    `;
    const VALUES = [data.player1, data.player2]

    pool.query(SQLSTATMENT,VALUES, callback); 
}

// update doubles winner
module.exports.updateDoublesWinner = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Court
    SET date = CURRENT_TIMESTAMP, player1 = ?, player1Pair = ?, player2 = ?, player2Pair = ?, winner = ?
    WHERE id = ?;

    UPDATE Player
    SET level = level + 1    
    WHERE id = ?;

    UPDATE Player
    SET level = level + 1    
    WHERE id = ?;
    `;
    const VALUES = [data.player1, data.player1Pair, data.player2, data.player2Pair, data.winner, data.court_id, data.winner, data.winnerPair]

    pool.query(SQLSTATMENT,VALUES, callback); 
}

// update doubles draw
module.exports.updateDoublesDraw = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Court
    SET date = CURRENT_TIMESTAMP, player1 = ?, player1Pair = ?, player2 = ?, player2Pair = ?, winner = "Draw"
    WHERE id = ?;
    `;
    const VALUES = [data.player1, data.player1Pair, data.player2, data.player2Pair, data.court_id]

    pool.query(SQLSTATMENT,VALUES, callback); 
}

// delete court by id 
module.exports.deleteCourt = (data,callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Court 
    WHERE id = ?;
    `;
    const VALUES = [data.id]

    pool.query(SQLSTATMENT,VALUES, callback); 
}
