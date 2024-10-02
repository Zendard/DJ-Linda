const { SlashCommandBuilder } = require("discord.js");
const {joinVoiceChannel,createAudioPlayer } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("kom")
  .setDescription("Joint de channel"),
  async execute(interaction) {
    const channel = interaction.member.voice.channel;
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    if (connection.state!== "CONNECTED") {
      interaction.reply('Gejoint')} {
  }
}}
