const pool = require('../services/db');

//create new Item 
module.exports.insertItem = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Shop (brand, type, name, atk, def)
    VALUES (?, ?, ?, ?, ?);
    `;
    const VALUES = [data.brand, data.type, data.name, data.atk, data.def];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// read all Items
module.exports.selectAllItems = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Shop;
    `;

    pool.query(SQLSTATMENT, callback);
}

// read Item by Name
module.exports.selectItemByName = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Shop
    WHERE name = ?;
    `;
    const VALUES = [data.name];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// read Item by ID
module.exports.selectItemById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Shop
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// read Item by type
module.exports.selectItemByType = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Shop
    WHERE type = ?;
    `;
    const VALUES = [data.type];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// read Item by Brand
module.exports.selectItemByBrand = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Shop
    WHERE brand = ?;
    `;
    const VALUES = [data.brand];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// update player by ID
module.exports.updateItemsById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Shop 
    SET brand = ?, type = ?, name = ?, atk = ?, def = ?
    WHERE id = ?;
    `;
    const VALUES = [data.brand, data.type, data.name, data.atk, data.def, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// delete Item by ID
module.exports.deleteItemById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Shop 
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}     // ALTER TABLE Player AUTO_INCREMENT = 1;
