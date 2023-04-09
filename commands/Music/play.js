const { SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection, joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");
const fs = require('fs');
const youtubedl = require('youtube-dl-exec');

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("voel")
    .setDescription("Voelt een beat")
    .addStringOption(option =>
      option
        .setName('naam')
        .setDescription('de naam/url van het lied')
        .setRequired(true)),

  async execute(interaction) {
    const naam = interaction.options.getString('naam')
    let connection = getVoiceConnection(interaction.guild.id);

    if (!connection) {
      const channel = interaction.member.voice.channel;
      if (!channel) {
        interaction.reply('Je moet in een voice kanaal zitten om dit commando te gebruiken');
        return;
      }
      connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
    }

    if (isValidHttpUrl(naam)) {
      const video = await youtubedl(naam, {'extractAudio': true,'o':"1"});
      if (video) {
        const musicFiles = await fs.readdirSync(".").filter((file) => file.endsWith(".opus"));
        const player = createAudioPlayer();
        connection.subscribe(player);
        player.play(createAudioResource(musicFiles[0]));
        interaction.reply('Beat  wordt gevoeld');
      } else {
        interaction.reply('Video niet gevonden');
      }
    }
  }
};
