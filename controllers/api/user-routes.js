const router = require('express').Router();
const bcrypt = require('bcrypt');

//Import the User model
const User = require('../../models/User');

//Get all users
router.get('/', (req, res) => {
    User.findAll().then((userData) => {
        res.json(userData);
    })
    .catch((err) => {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Error fetching users' });
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

// Create a user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({ name, email, password });

        // Set up sessions with a 'loggedIn' variable set to `true`
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(201).json({ userId: user.id });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/change-password', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
  
      const isValid = await bcrypt.compare(oldPassword, user.password);
      if (!isValid) {
        return res.status(400).json({ error: 'Incorrect old password' });
      }
  
      user.password = newPassword; // this will trigger the beforeUpdate hook to hash the new password
      await user.save();

      res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
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

// Login
router.post('/login', async (req, res) => {
    try {
      const dbUserData = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
  
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      // Once the user successfully logs in, set up the sessions variable 'loggedIn'
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res
          .status(200)
          .json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  // Logout
  router.post('/logout', (req, res) => {
    // When the user logs out, destroy the session
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  /*
  // Save Personal Information
app.post('/save-personal-info', async (req, res) => {
  const { firstName, lastName, linkedinProfile, email, aboutMe } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    await user.update({ firstName, lastName, linkedinProfile, aboutMe });
    res.status(200).json({ message: 'Personal information saved successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Save Profile Picture
app.post('/save-profile-picture', async (req, res) => {
  const { profilePicture, email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    await user.update({ profilePicture });
    res.status(200).json({ message: 'Profile picture saved successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
*/
  
module.exports = router;