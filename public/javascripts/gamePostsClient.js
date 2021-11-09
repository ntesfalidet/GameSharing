// Holds the container for all the game posts
const gamePostsContainer = document.querySelector("#gamePostsContainer");

// Images object contains key value pairs associating the category name (as the key) with 
// the image name (as the value) 
const images = { 
  "Adventure": "adventureImage",
  "Battle Royale": "battleRoyaleImage",
  "Fighting": "fightingImage", 
  "Platform": "platformImage",
  "Racing": "racingImage",
  "Rhythm": "rhythmImage",
  "RPG": "rpgImage",
  "Sandbox": "sandboxImage",
  "Shooter": "shooterImage", 
  "Stealth": "stealthImage",
  "Strategy": "strategyImage",
  "Survival": "survivalImage" 
};

// This function is responsible for loading game posts from 
// server-side to frontend
async function loadGamePosts() {
  // Fetch response data from server-side as raw data
  const resRawData = await fetch("/getGamePosts");
  // If response is not returned successfully
  if (!resRawData.ok) {
    console.log("Response status ", resRawData.status);
  }
  // Parses the response raw data (as JSON) and returns the gamePosts
  // array wrapped in JavaScript object.
  const resData = await resRawData.json();
  console.log("Got all game posts ", resData);

  // Get gamePosts array from resData Object
  // For each game post in the gamePosts array, we pass the game post as
  // a param to createGamePostCard function. 
  resData.gamePosts.forEach(createGamePostCard);
}

// This function is responsible for creating and rendering the game post 
// cards in the frontend.
function createGamePostCard(gamePost) {
  const gamePostsRowDiv = document.createElement("div");
  gamePostsRowDiv.className = "row gamePostsRow";
  const gamePostCardDiv = document.createElement("div");
  gamePostCardDiv.className = "col-md-6 gamePostCard";
  const gamePostSectionDiv = document.createElement("div");
  gamePostSectionDiv.className = "gamePostSection";

  // For rendering the current logged in user
  // in a game post card when a user submit a game post
  const postUserDiv = document.createElement("div");
  postUserDiv.className = "postUser";

  // We will change this later //
  postUserDiv.innerText = `Posted by ${gamePost.createdBy}`;

  // This is for rendering certain attributes of the game post
  // card after a user submits a game post 
  const postTitleDiv = document.createElement("div");
  postTitleDiv.className = "postTitle";
  postTitleDiv.innerText = gamePost.title;
  const postCategoryDiv = document.createElement("div");
  postCategoryDiv.className = "postCategory";
  postCategoryDiv.innerText = `Category: ${gamePost.category}`; 
  const postImageDiv = document.createElement("div");
  postImageDiv.className = "postImage";
  const categoryImg = document.createElement("img");
  categoryImg.setAttribute("src", `/images/${images[gamePost.category]}.png`);
  categoryImg.setAttribute("alt", images[gamePost.category]);
  postImageDiv.appendChild(categoryImg);
  const postDescriptionDiv = document.createElement("div");
  postDescriptionDiv.className = "postDescription";
  postDescriptionDiv.innerText = gamePost.description;
  const hrClassDiv = document.createElement("div");
  hrClassDiv.className = "hrClass";
  const hrElem = document.createElement("hr");
  hrClassDiv.appendChild(hrElem);

  // This is for rendering the likes, dislikes and comment section
  // for a gamepost card
  const lastSectionDiv = document.createElement("div");
  lastSectionDiv.className = "lastSection";

  const likeContainerDiv = document.createElement("div");
  likeContainerDiv.className = "likeContainer";
  // Responsible for passing necessary request data
  // from form like to server-side
  const formLikeSection = document.createElement("form");
  formLikeSection.setAttribute("id", "likeGamePostForm");
  formLikeSection.setAttribute("action", "/likeGamePost");
  formLikeSection.setAttribute("method", "POST");
  const hiddenLikes = document.createElement("input");
  hiddenLikes.setAttribute("class", "form-control");
  hiddenLikes.setAttribute("type", "hidden");
  hiddenLikes.setAttribute("name", "likes");
  hiddenLikes.setAttribute("value", `${gamePost.likes}`);
  // Responsible for sending the gamePost _id to server-side
  // for handling like game post
  const hiddenGamePostId1 = document.createElement("input");
  hiddenGamePostId1.setAttribute("class", "form-control");
  hiddenGamePostId1.setAttribute("type", "hidden");
  hiddenGamePostId1.setAttribute("name", "gamePostID");
  hiddenGamePostId1.setAttribute("value", `${gamePost._id}`);
  const likeImg = document.createElement("input");
  likeImg.className = "likeImageClass";
  likeImg.setAttribute("type", "image");
  likeImg.setAttribute("src", "/images/likeImage.png");
  likeImg.setAttribute("alt", "likeImage");
  const likeCounterDiv = document.createElement("div");
  likeCounterDiv.className = "likeCounter";
  likeCounterDiv.innerText = gamePost.likes;
  formLikeSection.appendChild(hiddenLikes);
  formLikeSection.appendChild(hiddenGamePostId1);
  formLikeSection.appendChild(likeImg);
  formLikeSection.appendChild(likeCounterDiv);
  likeContainerDiv.appendChild(formLikeSection);

  const commentContainerDiv = document.createElement("div");
  commentContainerDiv.className = "commentContainer";
  const commentImg = document.createElement("img");
  commentImg.setAttribute("src", "/images/commentImage.png");
  commentImg.setAttribute("alt", "commentImage");
  commentContainerDiv.appendChild(commentImg);

  const dislikeContainerDiv = document.createElement("div");
  dislikeContainerDiv.className = "dislikeContainer";
  // Responsible for passing necessary request data
  // from form dislike to server-side
  const formDislikeSection = document.createElement("form");
  formDislikeSection.setAttribute("id", "dislikeGamePostForm");
  formDislikeSection.setAttribute("action", "/dislikeGamePost");
  formDislikeSection.setAttribute("method", "POST");
  const hiddenDislikes = document.createElement("input");
  hiddenDislikes.setAttribute("class", "form-control");
  hiddenDislikes.setAttribute("type", "hidden");
  hiddenDislikes.setAttribute("name", "dislikes");
  hiddenDislikes.setAttribute("value", `${gamePost.dislikes}`);
  // Responsible for sending the gamePost _id to server-side
  // for handling dislike game post
  const hiddenGamePostId2 = document.createElement("input");
  hiddenGamePostId2.setAttribute("class", "form-control");
  hiddenGamePostId2.setAttribute("type", "hidden");
  hiddenGamePostId2.setAttribute("name", "gamePostID");
  hiddenGamePostId2.setAttribute("value", `${gamePost._id}`);
  const dislikeImg = document.createElement("input");
  dislikeImg.className = "dislikeImageClass";
  dislikeImg.setAttribute("type", "image");
  dislikeImg.setAttribute("src", "/images/dislikeImage.png");
  dislikeImg.setAttribute("alt", "dislikeImage");
  const dislikeCounterDiv = document.createElement("div");
  dislikeCounterDiv.className = "dislikeCounter";
  dislikeCounterDiv.innerText = gamePost.dislikes;
  formDislikeSection.appendChild(hiddenDislikes);
  formDislikeSection.appendChild(hiddenGamePostId2);
  formDislikeSection.appendChild(dislikeImg);
  formDislikeSection.appendChild(dislikeCounterDiv);
  dislikeContainerDiv.appendChild(formDislikeSection);

  /// Comments section for game posts ///
  const commentSectionDiv = document.createElement("div");
  commentSectionDiv.className = "commentSection";
  // This will help with with toggling between display: "block" and 
  // display: "none" for the comment section to its respective game post card
  commentSectionDiv.setAttribute("id", `commentSec_${gamePost._id}`);
  const commentPostContainerDiv = document.createElement("div");
  commentPostContainerDiv.className = "commentPostContainer";
  const formComment = document.createElement("form");
  formComment.setAttribute("id", "commentGamePostForm");
  formComment.setAttribute("action", "/commentGamePost");
  formComment.setAttribute("method", "POST");
  const createCommentSectionDiv = document.createElement("div");
  createCommentSectionDiv.className = "createCommentSection";

  // Responsible for sending the gamePost _id to server-side
  // for handling commenting game post
  const hiddenGamePostId3 = document.createElement("input");
  hiddenGamePostId3.className = "form-control";
  hiddenGamePostId3.setAttribute("type", "hidden");
  hiddenGamePostId3.setAttribute("name", "gamePostID");
  hiddenGamePostId3.setAttribute("value", `${gamePost._id}`);

  const textAreaComment = document.createElement("textarea");
  textAreaComment.className = "form-control";
  textAreaComment.setAttribute("cols", 5);
  textAreaComment.setAttribute("rows", 1);
  textAreaComment.setAttribute("name", "commentMessage");
  textAreaComment.setAttribute("placeholder", "Enter your comment here");
  textAreaComment.setAttribute("required", "");
  const commentButtonContainerDiv = document.createElement("div");
  commentButtonContainerDiv.className = "commentButtonContainer";
  const commentButton = document.createElement("button");
  commentButton.setAttribute("type", "submit");
  commentButton.className = "btn btn-success";
  commentButton.innerText = "Comment";
  commentButtonContainerDiv.appendChild(commentButton);
  createCommentSectionDiv.appendChild(hiddenGamePostId3);
  createCommentSectionDiv.appendChild(textAreaComment);
  createCommentSectionDiv.appendChild(commentButtonContainerDiv);
  formComment.appendChild(createCommentSectionDiv);
  const commentHRElem = document.createElement("hr");
  commentHRElem.setAttribute("id", "commentHR");
  const commentsListDiv = document.createElement("div");
  commentsListDiv.className = "commentsList";

  // If comments array in gamePost is not empty 
  // we create a comment card for each comment
  // in comments array
  if (gamePost.comments.length) {
    gamePost.comments.forEach(comment => {
      // We handle creating a comment card for each comments here
      const commentCardDiv = document.createElement("div");
      commentCardDiv.className = "commentCard";
      const commentUserDateDiv = document.createElement("div");
      commentUserDateDiv.className = "commentUserDate";
      const commentUserDiv = document.createElement("div");
      commentUserDiv.className = "commentUser";
      commentUserDiv.innerText = comment.commentedBy;
      const commentDateDiv = document.createElement("div");
      commentDateDiv.className = "commentDate";
      commentDateDiv.innerText = comment.createdAt;
      commentUserDateDiv.appendChild(commentUserDiv);
      commentUserDateDiv.appendChild(commentDateDiv);
      const commentMessageDiv = document.createElement("div");
      commentMessageDiv.className = "commentMessage";
      commentMessageDiv.innerText = comment.commentMessage;
      commentCardDiv.appendChild(commentUserDateDiv);
      commentCardDiv.appendChild(commentMessageDiv);
      commentsListDiv.appendChild(commentCardDiv);
    });
  }

  // If our comments array in gamePost is empty
  // then we add a no comments div
  if (!gamePost.comments.length) {
    const noCommentsDiv = document.createElement("div");
    noCommentsDiv.className = "noComments";
    noCommentsDiv.innerText = "No comments";
    commentsListDiv.appendChild(noCommentsDiv);
  }

  commentPostContainerDiv.appendChild(formComment);
  commentPostContainerDiv.appendChild(commentHRElem);
  commentPostContainerDiv.appendChild(commentsListDiv);
  commentSectionDiv.appendChild(commentPostContainerDiv);

  // Append all the remaining div elements to our
  // gamePostsContainer

  lastSectionDiv.appendChild(likeContainerDiv);
  lastSectionDiv.appendChild(commentContainerDiv);
  lastSectionDiv.appendChild(dislikeContainerDiv);

  gamePostSectionDiv.appendChild(postUserDiv);
  gamePostSectionDiv.appendChild(postTitleDiv);
  gamePostSectionDiv.appendChild(postCategoryDiv);
  gamePostSectionDiv.appendChild(postImageDiv);
  gamePostSectionDiv.appendChild(postDescriptionDiv);
  gamePostSectionDiv.appendChild(hrClassDiv);
  gamePostSectionDiv.appendChild(lastSectionDiv);

  gamePostCardDiv.appendChild(gamePostSectionDiv);
  gamePostCardDiv.appendChild(commentSectionDiv);
  gamePostsRowDiv.appendChild(gamePostCardDiv);
  gamePostsContainer.appendChild(gamePostsRowDiv);


  // We initialize the display of the comment section (for each game post card)
  // to none and we add an event listener to the comment container to toggle
  // between display: "block" and display: "none"
  document.getElementById(`commentSec_${gamePost._id}`).style.display = "none";
  commentContainerDiv.addEventListener("click", () => {
    console.log("Clicked");
    console.log("ObjectID", gamePost._id);
    if (document.getElementById(`commentSec_${gamePost._id}`).style.display === "none") {
      document.getElementById(`commentSec_${gamePost._id}`).style.display = "block";
    }
    else {
      document.getElementById(`commentSec_${gamePost._id}`).style.display = "none";
    } 
  });
}

loadGamePosts();