const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    // signup
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        })
        req.session.save(()=> {
            req.session.userId = newUser.id;
            req.session.username = newUser.username;
            req.session.loggedIn = true;

            res.json(newUser)
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    // login
    try {
      const user = await User.findOne({ where: { username: req.body.username } });
  
      if (!user) {
        res.status(400).json({ message: 'User account cannot be found' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Email or password is incorrect, please try again' });
        return;
      }
  
      req.session.save(()=> {
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;
        
        res.json({ user: user, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
});
  
router.post('/logout', (req, res) => {
    // logout
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});
  
module.exports = router;