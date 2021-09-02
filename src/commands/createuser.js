// Core packages

// NPM packages

// Local packages
const firestore = require("../../firestore/db");

module.exports = {
  name: "createuser",
  description: "Creates new user based on DiscordID",

  async execute(message) {
    // Reference to the collection
    const userCollection = await firestore.collection("users");

    // check if user has account already
    const snapshotArr = await userCollection
      .where("discord_id", "==", `${message.author.id}`)
      .get();

    // return message and exit if exists
    if (!snapshotArr.empty) {
      return message.reply("Account already exists");
    }

    // define document for firebase
    const userDoc = {
      discord_id: message.author.id,
      discord_username: message.author.username,
      games: [],
    };

    await userCollection.add(userDoc);

    return message.reply("Account successfully set up");
  },
};
