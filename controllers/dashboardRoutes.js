const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    // Shows all posts for user
    try {
        const postData = await Post.findAll({
            where: {
                userId: req.session.userId
            },
            include: [User]
        })
        const posts = postData.map((post) => post.get({ plain: true }))
        res.render('dashboard', {
            posts,
            loggedIn: true
        })
    } catch (err) {
        res.redirect('login')
    }
});

// when you click on new post
router.get('/new', (req, res) => {
    // new post 
    res.render('new-post')
});

// when you click on a post
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id)

        // serialize
        if (postData) {
            const post = postData.get({ plain: true })

            res.render('edit-post', {
                post,
                loggedIn: true
            })
        } else {
            res.status(404).end()
        }
    } catch (err) {
        res.redirect('login')
    }
});

module.exports = router;