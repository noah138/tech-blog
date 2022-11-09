const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, (req, res) => {
    // create a new post
    if (req.session) {
        Post.create({
            body: req.body.body,
            user_id: req.body.user_id,
            post_id: req.session.post_id,
        })
        .then(newPost => res.json(newPost))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }
});

router.put('/:id', withAuth, (req, res) => {
    // update a post's body by its `id` value
    Post.update({
        title: req.body.title,
        body: req.body.body
    }, {
      where: {
        id: req.params.id
      }
    }).then(post => {
        if (!post) {
          res.status(404).json({ message: 'No post found by that ID.'});
          return;
        }
        res.json(post)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});
  
router.delete('/:id', withAuth, (req, res) => {
    // delete a post by its `id` value
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(post => {
        if (!post) {
          res.status(404).json({ message: 'No post found by that ID.'});
          return;
        }
        res.json(post)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});
  
module.exports = router;