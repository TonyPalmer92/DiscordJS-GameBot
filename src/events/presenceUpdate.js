// Core packages

// NPM packages
const firebase = require("firebase-admin");

// Local packages
const firestore = require("../../firestore/db");
const utils = require("../utils/utils");

// ENUM for statuses
const status = {
  ONLINE: "online",
  OFFLINE: "offline",
  IDLE: "idle",
  DONOTDISTURB: "dnd",
  CUSTOMSTATUS: "Custom Status",
};

module.exports = {
  name: "presenceUpdate",
  description: "Tracks users time spent on a game, based on the game activity",

  async execute(oldPresence, newPresence) {
    // ignore users logging on
    if (oldPresence === null || oldPresence.status === "offline") return;

    // ignore other statuses
    switch (newPresence.status) {
      case status.OFFLINE:
      case status.IDLE:
      case status.DONOTDISTURB:
        return;
    }

    // ignore other statuses
    switch (oldPresence.status) {
      case status.IDLE:
      case status.DONOTDISTURB:
        return;
    }

    // Reference to the collection
    const userCollection = await firestore.collection("users");

    // check if user has account already
    const snapshotArr = await userCollection
      .where("discord_id", "==", `${newPresence.user.id}`)
      .get();

    // return if user does not exists
    if (snapshotArr.empty) {
      console.log("No user exists in firestore...");
      console.log(newPresence.user.id);
      return;
    }

    // get user document Reference
    const userRef = snapshotArr.docs[0];

    // PLAYER STARTED PLAYING A GAME
    if (newPresence.activities.length > 0) {
      const activity = newPresence.activities[0]; // Get current activity

      if (activity.name === status.CUSTOMSTATUS) return; // if activity is a custom status (which is not a game)

      // access documentRef data as an object
      const user = userRef.data();

      const index = user.games.findIndex((game) => game === activity.name);

      // If game name does not exists then create it
      if (index === -1) {
        const newGame = {
          name: activity.name,
          wins: 0,
          totalPlayTime: 0, // in seconds
          startTime: Date.now(),
        };

        await userRef.ref.update({
          [activity.name]: newGame,
          games: firebase.firestore.FieldValue.arrayUnion(activity.name),
        });

        return;
      }

      // update new start time for the game in db
      userRef.ref.set(
        {
          [activity.name]: {
            startTime: Date.now(),
          },
        },
        { merge: true }
      );

      return;
    }

    // PLAYER STOPPED PLAYING A GAME
    if (newPresence.activities.length < 1) {
      // access documentRef data as an object
      const user = userRef.data();

      if (!user) {
        console.log("OLD: ", oldPresence);
        console.log("NEW: ", newPresence);

        console.log("No user found - Unable to track presence.");
        console.log(newPresence.user.username);
        return;
      }
      const activity = oldPresence.activities[0];

      // check game obj exists in games arr for existing user
      const index = user.games.findIndex((game) => game === activity.name);

      if (index === -1) {
        console.log("Game not found in games array");
        return;
      }

      // get game obj from user games array
      const game = user[activity.name];

      // get startTime of the current game
      const startTime = game.startTime;

      // store end time
      const endTime = Date.now();

      // store difference between time
      const diff = endTime - startTime; // In milisec

      // add diff to existing total time
      const newTotalPlayTime = (game.totalPlayTime += diff);

      // update new totalPlayTime for the game in db
      userRef.ref.set(
        {
          [activity.name]: {
            totalPlayTime: newTotalPlayTime,
          },
        },
        { merge: true }
      );

      return;
    }

    // PLAYER STARTED A SECOND GAME
    if (
      oldPresence.activities.length === 1 &&
      newPresence.activities.length === 1
    ) {
      const activity = newPresence.activities[0];

      // check game obj exists in games arr for existing user
      const index = user.games.findIndex((game) => game === activity.name);

      if (index === -1) {
        const newGame = {
          name: activity.name,
          wins: 0,
          totalPlayTime: 0, // in seconds
          startTime: Date.now(),
        };

        await userRef.ref.update({
          [activity.name]: newGame,
          games: firebase.firestore.FieldValue.arrayUnion(activity.name),
        });

        return;
      }

      // update new start time for the game in db
      userRef.ref.set(
        {
          [activity.name]: {
            startTime: Date.now(),
          },
        },
        { merge: true }
      );

      return;
    }
  },
};
