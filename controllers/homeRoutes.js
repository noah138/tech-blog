const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    // Shows all posts
    try {
        const postData = await Post.findAll({
            include: [User]
        })

        // serialize
        const posts = postData.map((post) => post.get({ plain: true }))
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/post/id:', withAuth, async (req, res) => {
    // Shows one post
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: [
                User,
                {
                    model: Comment,
                    include: [User]
                }
            ]
        })

        if (postData) {
            // serialize
            const post = postData.get({ plain: true })

            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn
            })
        } else {
            res.status(404).end()
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // login
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    //signup
    if (req.session.loggedIn) {
      res.redirect('/dashboard');
      return;
    }
    res.render('signup');
});


module.exports = router;