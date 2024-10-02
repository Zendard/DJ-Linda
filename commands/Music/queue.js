const { SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder().setName("queue").setDescription("Toont de queue"),
  async execute(interaction) {
    const connection = getVoiceConnection(interaction.guild.id);
    const player = connection.player;
    const queue = player.getQueue(interaction.guildId);
    interaction.reply(queue);
  },
};
