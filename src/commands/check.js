const User = require("../../models/UserSchema");
const moment = require("moment");
const utils = require("../../utils/utils");

module.exports = {
  name: "check",
  description: "Checks current game count score",

  async execute(message, args, id) {
    try {
      if (args.length < 1) {
        message.reply("You did not specify a game to check!");
        throw Error("No param was passed in.");
      }

      const data = await User.findOne({
        discordID: id,
      });

      if (!data) {
        message.reply("No user exists, please create your profile!");
        return;
      }

      // Converts mongoDB document to regular object
      // makes it possible to check property
      const doc = data.toObject();

      // Will return the game found or False
      const game = utils.searchForGame(args[0]);
      if (!game) {
        message.reply("There is no game with that name within the database!");
        throw Error("Search term did not find a game.");
      }
      const property = game.property;

      // Check if search term matches property on document
      // & return total wins for that game
      if (doc.hasOwnProperty(property)) {
        return message.reply(`You have ${doc[property]} wins on ${game.name}`);
      } else {
        return message.reply(
          `You need to add ${game.name}, try using !add [GAME] first`
        );
      }
    } catch (error) {
      const err = {
        message: error.message,
        user: id,
        stack: error.stack,
        timestamp: moment().format("DD-MM-YYYY hh:mm:ss A"),
      };
      console.log(err);
    }
  },
};
