const sequelize = require("../config/connection");
const { User, Comment, Post } = require("../models");

const userData = require("./user.json");
const postData = require("./post.json");
const commentData = require("./comment.json");

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users =await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const comment of commentData) {
        await Comment.create({
            ...comment,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    for (const post of postData) {
        await Post.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
    
};

seedDatabase();