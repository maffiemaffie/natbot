const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('fucks your mom sideways, replaces you in her will'),
  async execute(interaction) {
    await interaction.reply('can you please shut the fuck up?')
  }
};