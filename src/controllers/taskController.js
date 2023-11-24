// const data = require("../data");
const model = require("../models/taskModel.js");
// console.log(data.player.map(player => player.name));

module.exports.readAllTasks = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTasks:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

module.exports.readTaskById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

module.exports.createNewTask = (req, res, next) => {
    if(req.body.task == undefined || req.body.description == undefined || req.body.points == undefined)
    {
        res.status(400).send("Error: task or description or points is undefined");
        return;
    }

    const data = {
        task: req.body.task,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTask:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results);
        }
    }

    model.insertSingle(data, callback);
}

module.exports.updateTaskById = (req, res, next) => {
    if(req.body.task == undefined || req.body.description == undefined || req.body.points == undefined)
    {
        res.status(400).json({
            message: "Error: username or email is undefined"
        });
        return;
    }

    const data = {
        id: req.params.id,
        task: req.body.task,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(204).send(); // 204 No Content
        }
    }

    model.updateById(data, callback);
}

module.exports.deleteTaskById = (req, res, next) => {
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteById(data, callback);
}