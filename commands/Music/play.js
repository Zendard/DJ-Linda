const { SlashCommandBuilder } = require("discord.js");
const { getVoiceConnection, joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");
const fs = require("fs");
const youtubedl = require("youtube-dl-exec");
var video_number = 0;

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
    .addStringOption((option) => option.setName("naam").setDescription("de naam/url van het lied").setRequired(true)),

  async execute(interaction) {
    const naam = interaction.options.getString("naam");
    let connection = getVoiceConnection(interaction.guild.id);

    if (!connection) {
      const channel = interaction.member.voice.channel;
      if (!channel) {
        interaction.reply("Je moet in een voice kanaal zitten om dit commando te gebruiken");
        return;
      }
      connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
    }

    if (isValidHttpUrl(naam)) {
      const video_title = await youtubedl(naam, {getTitle:true});
      let video_name = "[" + video_number + "]"+" "+ video_title;
      await youtubedl(naam, { extractAudio: true, o: video_name });
    }
    video_number++;
    const musicFiles = await fs.readdirSync(".").filter((file) => file.endsWith(".opus"));
    if (musicFiles) {
      const player = createAudioPlayer();
      connection.subscribe(player);
      player.play(createAudioResource(musicFiles[0]));
      interaction.reply("Beat  wordt gevoeld");
    } else {
      interaction.reply("Video niet gevonden");
    }
  },
};
