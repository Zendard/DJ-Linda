const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
const { token } = require("./config.json");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  console.log("Got message");
  console.log(msg.content);
  if (msg.content === "ping") {
    msg.reply("pong");
  }
});

client.login(token);
