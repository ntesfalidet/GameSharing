const express = require("express");
const path = require("path");
const router = express.Router();
const gameSharingDB = require("../database/gameSharingDB.js");


// GET game posts (gameposts/)
router.get("/", async function (req, res) {
  try {
    // Response of getting all game posts from database
    const gamePostsRes = await gameSharingDB.getGamePosts();
    console.log("Got all game posts from game-sharing-db ", gamePostsRes);
    res.send({ gamePosts: gamePostsRes });
    //res.sendFile(path.join(__dirname, "../public/gamePosts.html"));
  } catch (error) {
    console.log("GET game posts error message: ", error);
    //res.status(400).send({ err: error });
  }
});

// POST a game post (gameposts/createPost)
router.post("/createPost", async function (req, res){
  // Get the request body
  const createdGamePostBody = req.body;
  // Adjust the JSON object that's sent to gameposts collection
  const createdGamePost = {
    title: createdGamePostBody.title,
    category: createdGamePostBody.category,
    description: createdGamePostBody.description,
    likes: "0",
    dislikes: "0",
    comments: []
  };
  console.log("Create game post from frontend ", createdGamePost);
  try {
    // Return the response of inserting createdGamePost in gameposts collection
    const createdGamePostRes = await gameSharingDB.createGamePost(createdGamePost);
    console.log("Created game post in game-sharing-db ", createdGamePostRes);
  } catch (error) {
    console.log("POST game post error message: ", error);
  }

  //res.redirect("/gamePosts");
  res.sendFile(path.join(__dirname, "../public/gamePosts.html"));
});

//
// router.get("/list", function (req, res) {

//   res.json(gamePostsData);
// });

module.exports = router;
