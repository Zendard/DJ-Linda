const { SlashCommandBuilder } = require("discord.js");
const {getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("ga-weg")
  .setDescription("Leavet de channel"),
  async execute(interaction) {
    const guildId = interaction.guildId;
    const  connection = getVoiceConnection(guildId);
    if (connection) {
    connection.destroy();
    interaction.reply('Geleavet');  
  }else{interaction.reply("Ik ben nog geen channel gejoint")}
  }}
