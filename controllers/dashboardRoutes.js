// Bringing in the expres router and sequelize DB
const router = require("express").Router();
const sequelize = require("../config/connection");

// Bringin in the models
const { User, Comment, Post } = require("../models");


// A route to render the dashboard page, only for a logged in user
router.get("/", withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            "id",
            "post_text",
            "title",
            "created_at",
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    "id",
                    "comment_text",
                    "post_id",
                    "user_id",
                    "created_at"
                ],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostdata.map(post => post.get({ plain: true }));
            res.render("dashboard", { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// A route to edit a post
router.get("/edit/:id", withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            "id",
            "post_text",
            "title",
            "created_at",
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    "id",
                    "comment_text",
                    "post_text",
                    "user_id",
                    "created_at"
                ],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: "No post found with this id!" });
                return;
            }
            const post = dbPostData.get({ plain: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// // A route to edit the logged in user
router.get('/edituser', withAuth, (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.session.user_id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            const user = dbUserData.get({ plain: true });
            res.render('edit-user', { user, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;