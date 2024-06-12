const router = require('express').Router();

//Import the Task model
const Task = require('../../models/Task');

//Get all tasks
router.get('/', (req, res) => {
    Task.findAll().then((taskData) => {
        res.json(taskData);
    });
});

//Get a task based on it's id
router.get('/:id', (req, res) => {
    Task.findOne({
            where: {
                id: req.params.id
            },
        })
        .then((taskData) => {
            res.json(taskData);
    });
});

//Create a task
router.post('/', (req, res) =>{
    Task.create({
        title: req.body.title,
        description: req.body.description,
        due_date: req.body.due_date,
        priority: req.body.priority,
        status: req.body.status,
        assigned_to: req.body.assigned_to,
        created_by: req.body.created_by
    }).then((newTask) => {
        res.json(newTask);
    }).catch((err) => {
        res.json(err);
    });
});

//Updates the task based on it's id
router.put('/:id', (req, res) => {
    Task.update({
        title: req.body.title,
        description: req.body.description,
        due_date: req.body.due_date,
        priority: req.body.priority,
        status: req.body.status,
        assigned_to: req.body.assigned_to,

    },
    {
        where: {
            id: req.params.id
        },
    }).then((updatedTask) => {
        res.json(updatedTask);
    }).catch((err) => res.json(err));
});

//Delete a task based on it's id
router.delete('/:id', (req, res) => {
    Task.destroy({
        where: {
            id: req.params.id
        }, 
    }).then((taskData) => {
        res.json(taskData);
    });
});

module.exports = router;