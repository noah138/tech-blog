const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    // find all comments
    Comment.findAll()
        .then(comments => res.json(comments))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
    // find one comment by its `id` value
    Comment.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(comments => res.json(comments))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

router.post('/', withAuth, (req, res) => {
    // create a new comment
    if (req.session) {
        Comment.create({
            body: req.body.body,
            user_id: req.body.user_id,
            post_id: req.session.post_id,
        })
        .then(newComment => res.json(newComment))
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        })
    }
});

router.put('/:id', withAuth, (req, res) => {
    // update a comment's body by its `id` value
    Comment.update({
        body: req.body.body
    }, {
      where: {
        id: req.params.id
      }
    }).then(comment => {
        if (!comment) {
          res.status(404).json({ message: 'No comment found by that ID.'});
          return;
        }
        res.json(comment)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});
  
router.delete('/:id', withAuth, (req, res) => {
    // delete a comment by its `id` value
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(comment => {
        if (!comment) {
          res.status(404).json({ message: 'No comment found by that ID.'});
          return;
        }
        res.json(comment)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});
  
module.exports = router;