const pool = require('../services/db');

// check if task and user id exists 
module.exports.checkId = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User 
    WHERE user_id = ?;

    SELECT * FROM Task 
    WHERE task_id = ?
    `;
    const VALUES = [data.user_id, data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// check progress id exists
module.exports.checkTaskProgressID = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM TaskProgress
    WHERE progress_id = ?
    `;
    const VALUES = [data.progress_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//create new task progress and select it to display 
module.exports.createTaskProgress = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
    VALUES (?, ?, ?, ?);

    SELECT progress_id, user_id, task_id, DATE(completion_date) AS completion_date, notes FROM TaskProgress 
    WHERE progress_id = LAST_INSERT_ID();
    `;
    const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// get/display task progress by id 
module.exports.getTaskProgressByID = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT progress_id, user_id, task_id, DATE(completion_date) AS completion_date, notes FROM TaskProgress 
    WHERE progress_id = ?
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// update task progress with ne details
module.exports.updateTaskProgress = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE TaskProgress 
    SET user_id = IFNULL(?, user_id), task_id = IFNULL(?, task_id) , completion_date = IFNULL(?, completion_date) , notes = ?
    WHERE progress_id = ?
    `;
    const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes, data.progress_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// delete task by specific id 
module.exports.deleteTaskId = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM TaskProgress
    WHERE progress_id = ?
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}