const pool = require('../services/db');

// select task by id 
module.exports.checkTaskID = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Task
    WHERE task_id = ?
    `;
    const VALUES = [data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// create task 
module.exports.createTasks = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Task (title, description, points)
    VALUES (?, ?, ?);

    SELECT * FROM Task 
    WHERE task_id = LAST_INSERT_ID();
    `;
    const VALUES = [data.title, data.description, data.points];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// get/display all tasks
module.exports.getAllTasks = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Task
    `;

    pool.query(SQLSTATMENT, callback);
}

// get/display task by specific id
module.exports.getTaskByID = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Task
    WHERE task_id = ?
    `;
    const VALUES = [data.taskId];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// update task based on id
module.exports.updateTask = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Task
    SET title = ?, description = ? , points = ? 
    WHERE task_id = ?
    `;
    const VALUES = [data.title,data.description,data.points, data.taskId];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// delete task from Task table and TaskProgress table
module.exports.deleteTaskId = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Task
    WHERE task_id = ?;

    DELETE FROM TaskProgress
    WHERE task_id = ?
    `;
    const VALUES = [data.id, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}