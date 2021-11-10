const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

// Helper variables for setting up connection to database
const URL = process.env.MONGO_URL || "mongodb://localhost:27017";
const DB_NAME = "game-sharing-db";

// Yuanyuan: It is very helpful that you have put very detailed comment. Easy to read and follow. 
// Yuanyuan: It is amazing that you have designed a such complete project just by yourself. Everything here is very organized.
// Yuanyuan: Pretty good job!
function gameSharingDB() {
  // Store database operations/functions in gameSharingDB JSON object
  const gameSharingDB = {};

  /// Database operations for users ///

  // This function is responsible for finding an existing user in users collection
  // based on the user's user name and password
  // We pass in user (containing userName and password) from server-side as a query
  gameSharingDB.findUser = async function (user) {
    console.log("Finding user called");
    let client;
    try {
      client = new MongoClient(URL, { useUnifiedTopology: true });
      console.log("Connecting to game-sharing-db");
      await client.connect();
      console.log("Connected to game-sharing-db");
      const db = client.db(DB_NAME);
      const gamePostsCollection = db.collection("users");
      // returns the array of users in users collection that match
      // the passed in user query
      return await gamePostsCollection.find(user).toArray();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing connection to game-sharing-db");
      await client.close();
    }
  };

  // This function is responsible for finding an existing user in users collection
  // based only on the user's user name
  // We pass in userName from server-side as a query
  gameSharingDB.findUserName = async function (userName) {
    console.log("Finding user called");
    let client;
    try {
      client = new MongoClient(URL, { useUnifiedTopology: true });
      console.log("Connecting to game-sharing-db");
      await client.connect();
      console.log("Connected to game-sharing-db");
      const db = client.db(DB_NAME);
      const gamePostsCollection = db.collection("users");
      // returns the array of users in users collection that match
      // the passed in userName query
      return await gamePostsCollection.find(userName).toArray();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing connection to game-sharing-db");
      await client.close();
    }
  };

  // This function is responsible for registering a new user in database
  // We pass in user (containing userName and password) from server-side to insert into
  // the users collection
  gameSharingDB.registerUser = async function (user) {
    console.log("Create game post called");
    let client;
    try {
      client = new MongoClient(URL, { useUnifiedTopology: true });
      console.log("Connecting to game-sharing-db");
      await client.connect();
      console.log("Connected to game-sharing-db");
      const db = client.db(DB_NAME);
      const gamePostsCollection = db.collection("users");
      // returns the response of creating (inserting) a user
      // in the users collection
      return await gamePostsCollection.insertOne(user);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing connection to game-sharing-db");
      await client.close();
    }
  };

  /// Database operations for game posts ///

  // getGamePosts function gets all of the game posts (documents) from gameposts collection
  gameSharingDB.getGamePosts = async function () {
    console.log("Get game posts called");
    let client;
    try {
      client = new MongoClient(URL, { useUnifiedTopology: true });
      console.log("Connecting to game-sharing-db");
      await client.connect();
      console.log("Connected to game-sharing-db");
      const db = client.db(DB_NAME);
      const gamePostsCollection = db.collection("gameposts");
      const query = {};
      // returns the response of querying and getting all game posts
      // from gameposts collection
      return await gamePostsCollection.find(query).sort({ _id: -1 }).toArray();
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing connection to game-sharing-db");
      await client.close();
    }
  };

  // createGamePost function inserts createdGamePost object to gameposts collection
  gameSharingDB.createGamePost = async function (createdGamePost) {
    console.log("Create game post called");
    let client;
    try {
      client = new MongoClient(URL, { useUnifiedTopology: true });
      console.log("Connecting to game-sharing-db");
      await client.connect();
      console.log("Connected to game-sharing-db");
      const db = client.db(DB_NAME);
      const gamePostsCollection = db.collection("gameposts");
      // returns the response of creating (inserting) a game post
      // in the gameposts collection
      return await gamePostsCollection.insertOne(createdGamePost);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing connection to game-sharing-db");
      await client.close();
    }
  };

  // Set the likes fields of a gamePost document with updatedLikes
  // based on the ID of gamePost
  gameSharingDB.likeGamePost = async function (gamePostID, updatedLikes) {
    console.log("Like game post called");
    let client;
    try {
      client = new MongoClient(URL, { useUnifiedTopology: true });
      console.log("Connecting to game-sharing-db");
      await client.connect();
      console.log("Connected to game-sharing-db");
      const db = client.db(DB_NAME);
      const gamePostsCollection = db.collection("gameposts");
      // returns the response of updating a gamePost document
      // (based on its ID)
      return await gamePostsCollection.updateOne(
        { _id: new ObjectId(gamePostID) },
        { $set: { likes: updatedLikes } }
      );
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing connection to game-sharing-db");
      await client.close();
    }
  };

  // Set the dislikes field of a gamePost document with updatedDislikes
  // based on the ID of gamePost
  gameSharingDB.dislikeGamePost = async function (gamePostID, updatedDislikes) {
    console.log("Dislike game post called");
    let client;
    try {
      client = new MongoClient(URL, { useUnifiedTopology: true });
      console.log("Connecting to game-sharing-db");
      await client.connect();
      console.log("Connected to game-sharing-db");
      const db = client.db(DB_NAME);
      const gamePostsCollection = db.collection("gameposts");
      // returns the response of updating dislike field of a gamePost document
      // (based on its ID)
      return await gamePostsCollection.updateOne(
        { _id: new ObjectId(gamePostID) },
        { $set: { dislikes: updatedDislikes } }
      );
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing connection to game-sharing-db");
      await client.close();
    }
  };

  // Append the gamePostComment to the comments field of a gamePost document
  // based on the ID of gamePost
  gameSharingDB.commentGamePost = async function (gamePostID, gamePostComment) {
    console.log("Dislike game post called");
    let client;
    try {
      client = new MongoClient(URL, { useUnifiedTopology: true });
      console.log("Connecting to game-sharing-db");
      await client.connect();
      console.log("Connected to game-sharing-db");
      const db = client.db(DB_NAME);
      const gamePostsCollection = db.collection("gameposts");
      // returns the response of updating comments field of a gamePost document
      // (based on its ID)
      return await gamePostsCollection.updateOne(
        { _id: new ObjectId(gamePostID) },
        { $push: { comments: gamePostComment } }
      );
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Closing connection to game-sharing-db");
      await client.close();
    }
  };
  return gameSharingDB;
}

module.exports = gameSharingDB();
