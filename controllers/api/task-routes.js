const router = require('express').Router();

//Import the Task model
const Task = require('../../models/Task');

//Get all tasks
router.get('/', (req, res) => {
    Task.findAll().then((taskData) => {
        res.json(taskData);
    })
    .catch((err) => {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: 'Error fetching tasks' });
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

/*
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  */

module.exports = router;