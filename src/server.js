// Load environment variables at runtime
require("dotenv").config();

// Core packages
const fs = require("fs");

// NPM packages
const { Client, Intents, Collection } = require("discord.js"); // require the needed discord.js classes

// Local packages
const db = require("../config/database");

// create a new Discord client
const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  ],
});
bot.commands = new Collection();

const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);

  if (event.once) {
    bot.once(event.name, (...args) => event.execute(...args, bot));
  } else {
    bot.on(event.name, (...args) => event.execute(...args, bot));
  }
}

// connect to DB
db();

// login to Discord with your app's token
bot.login(process.env.BOT_TOKEN);
