const express = require("express");
const router = express.Router();
const gameSharingDB = require("../database/gameSharingDB.js");

/// Routes for users ///

// user login route
router.post("/loginUser", async function (req, res) {
  // Contains the name and password of user from login
  // form request
  const user = req.body;

  // We pass user to findUser function when querying for a user
  try {
    // Response of finding a user
    // Returns an array of users that match the query of passed user
    // (containing the userName and password of a particular user)
    const userRes = await gameSharingDB.findUser(user);
    console.log("Get user from game-sharing-db ", userRes);
    // If userRes array is not empty
    if (userRes.length) {
      req.session.currUserName = user.userName;
    }
    res.send({ users: userRes });
  } catch (error) {
    console.log("login user error message: ", error);
    res.status(400).send({ err: error });
  }
});

// route for registering a new user
router.post("/registerUser", async function (req, res) {
  // Contains the name and password of user from register
  // form request
  const user = req.body;
  // We only utilize userName when querying for a user
  // upon user registration
  const userName = {
    userName: user.userName,
  };
  // We pass userName to findUserName function when querying for a user
  // with matching userName
  try {
    // Response of finding a user
    // Returns an array of users that match the query of passed userName
    const findUserRes = await gameSharingDB.findUserName(userName);
    console.log("Get user (user name) from game-sharing-db ", findUserRes);
    // const createUserRes

    // If findUserRes array is empty then we call registerUser function
    if (!findUserRes.length) {
      const registerUserRes = await gameSharingDB.registerUser(user);
      console.log("Created user in game-sharing-db", registerUserRes);
    }
    res.send({ users: findUserRes });
  } catch (error) {
    console.log("login user error message: ", error);
    res.status(400).send({ err: error });
  }
});

/// Routes for game posts ///
// get all game posts
router.get("/getGamePosts", async function (req, res) {
  try {
    // Response of getting all game posts (as an array) from gameposts
    // collection in database
    const gamePostsRes = await gameSharingDB.getGamePosts();
    console.log("Got all game posts from game-sharing-db ", gamePostsRes);
    res.send({ gamePosts: gamePostsRes });
  } catch (error) {
    console.log("Get game posts error message: ", error);
    res.status(400).send({ err: error });
  }
});

// create a game post
router.post("/createGamePost", async function (req, res) {
  // Get the request body
  const createdGamePostBody = req.body;

  // createdGamePost object that will be pushed to gameposts
  // collection in database
  const createdGamePost = {
    title: createdGamePostBody.title,
    category: createdGamePostBody.category,
    description: createdGamePostBody.description,
    likes: "0",
    dislikes: "0",
    comments: [],
    createdBy: req.session.currUserName,
  };
  console.log("Created game post ", createdGamePost);

  try {
    // Response of pushing createdGamePost object to gameposts
    // collection in database
    const createdGamePostRes = await gameSharingDB.createGamePost(
      createdGamePost
    );
    console.log("Created game post in game-sharing-db ", createdGamePostRes);
  } catch (error) {
    console.log("Create game post error message: ", error);
    res.status(400).send({ err: error });
  }

  res.redirect("/gamePosts.html");
});

// like a game post
router.post("/likeGamePost", async function (req, res) {
  // Get the body of request data (which contains the likes and
  // ID of a gamePost)
  const gamePostLikesData = req.body;

  // Update our likes from the gamePost object
  let updatedLikes = parseInt(gamePostLikesData.likes);
  updatedLikes += 1;
  updatedLikes = updatedLikes.toString();
  //console.log(updatedLikes);

  try {
    // Response of updating likes field of a gamePost document based on
    // the _id and updated likes counter of a gamePost object
    const updatedLikesGamePostRes = await gameSharingDB.likeGamePost(
      gamePostLikesData.gamePostID,
      updatedLikes
    );
    console.log(
      "Updated game post (likes) in game-sharing-db ",
      updatedLikesGamePostRes
    );
  } catch (error) {
    console.log("Updated game post (likes) error message: ", error);
    res.status(400).send({ err: error });
  }

  res.redirect("/gamePosts.html");
});

// dislike a game post
router.post("/dislikeGamePost", async function (req, res) {
  // Get the body of request data (which contains the dislikes and
  // ID of a gamePost)
  const gamePostDisLikesData = req.body;

  // Update our dislikes from the gamePost object
  let updatedDislikes = parseInt(gamePostDisLikesData.dislikes);
  updatedDislikes += 1;
  updatedDislikes = updatedDislikes.toString();
  // console.log(updatedDislikes);

  try {
    // Response of updating dislikes field of a gamePost document based on
    // the _id and updated dislikes counter of a gamePost object
    const updatedDislikesGamePostRes = await gameSharingDB.dislikeGamePost(
      gamePostDisLikesData.gamePostID,
      updatedDislikes
    );
    console.log(
      "Updated game post (dislikes) in game-sharing-db ",
      updatedDislikesGamePostRes
    );
  } catch (error) {
    console.log("Updated game post (dislikes) error message: ", error);
    res.status(400).send({ err: error });
  }

  res.redirect("/gamePosts.html");
});

// comment a game post
router.post("/commentGamePost", async function (req, res) {
  // Get the body of request data (which contains the comment message and
  // ID of a gamePost)
  const gamePostCommentsData = req.body;

  const commentDate = new Date();
  let commmentDateMonth = commentDate.getMonth() + 1;
  let commentDateDay = commentDate.getDate();
  let commentDateYear = commentDate.getFullYear();
  let commentDateTimeHours = commentDate.getHours();
  let commentDateTimeMinutes = commentDate.getMinutes();
  const commentCreatedAt =
    commmentDateMonth +
    "/" +
    commentDateDay +
    "/" +
    commentDateYear +
    " " +
    commentDateTimeHours +
    ":" +
    commentDateTimeMinutes;

  // console.log(commentCreatedAt);

  // game post comment (object) that will be pushed to
  // the comments field of a game post document
  const gamePostComment = {
    createdAt: commentCreatedAt,
    commentMessage: gamePostCommentsData.commentMessage,
    commentedBy: req.session.currUserName,
  };

  try {
    // Response of updating comments field of a gamePost document based on
    // the _id and comment object of a gamePost object
    const updatedCommentsGamePostRes = await gameSharingDB.commentGamePost(
      gamePostCommentsData.gamePostID,
      gamePostComment
    );
    console.log(
      "Updated game post (comments) in game-sharing-db ",
      updatedCommentsGamePostRes
    );
  } catch (error) {
    console.log("Updated game post (comments) error message: ", error);
    res.status(400).send({ err: error });
  }

  res.redirect("/gamePosts.html");
});

module.exports = router;
