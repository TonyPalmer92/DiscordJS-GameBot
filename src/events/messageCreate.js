// Create prefx for commands
const PREFIX = "!";
const fs = require("fs");

const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"));

module.exports = {
  name: "messageCreate",

  execute(message, bot) {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return; // Prevent BOT spamming server
    const discordName = message.author.tag; // Grabs name#number name in discord

    if (message.content.startsWith(PREFIX)) {
      const [commandType, ...args] = message.content
        .toLowerCase()
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

      if (args.length > 2 || args[1] === NaN) {
        message.reply("All commands only allows for 2 paramters!");
        return;
      }

      for (const file of commandFiles) {
        const command = require(`../commands/${file}`);

        bot.commands.set(command.name, command);
        bot.on(commandType, (...args) => command.execute(...args));
      }

      bot.commands.forEach((command) => {
        if (commandType === command.name) {
          command.execute(message, args, discordName);
          return;
        }
      });
    }
  },
};
