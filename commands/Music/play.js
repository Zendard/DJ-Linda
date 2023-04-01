const { SlashCommandBuilder } = require("discord.js");
const {getVoiceConnection,createAudioPlayer, createAudioResource} = require("@discordjs/voice");
const fs = require('fs')
const youtubedl = require('youtube-dl-exec');
const { default: youtubeDl } = require("youtube-dl-exec");
const { join } = require("path");

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
    const connection = await getVoiceConnection(interaction.guild);

    if (isValidHttpUrl(naam)) {
      const video = await youtubedl(naam, {'extractAudio': true,'name':"1"});
      if (video){
        const musicFiles = await fs.readdirSync(".").filter((file) => file.endsWith(".opus"));
        //const player = await createAudioPlayer();
        //await player.play(createAudioResource(join(__dirname,'video')))
        await connection.subscribe(createAudioResource(musicFiles[0]));
        //await player.play(createAudioResource(join(__dirname,'video')))
        interaction.reply('Beat  wordt gevoeld')
    }else{
    interaction.reply('Video niet gevonden')
    }}}}