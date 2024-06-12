const router = require('express').Router();

//Import the User model
const User = require('../../models/User');

//Get all users
router.get('/', (req, res) => {
    User.findAll().then((userData) => {
        res.json(userData);
    });
});

//Get a user based on their id
router.get('/:id', (req, res) => {
    User.findOne({
            where: {
                id: req.params.id
            },
        })
        .then((userData) => {
            res.json(userData);
    });
});

//Create a user
router.post('/', (req, res) =>{
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then((newUser) => {
        res.json(newUser);
    }).catch((err) => {
        res.json(err);
    });
});

//Updates the user based on their id
router.put('/:id', (req, res) => {
    User.update({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    },
    {
        where: {
            id: req.params.id
        },
    }).then((updatedUser) => {
        res.json(updatedUser);
    }).catch((err) => res.json(err));
});

//Delete a user based upon their id
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }, 
    }).then((userData) => {
        res.json(userData);
    });
});



module.exports = router;