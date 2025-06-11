import { command } from '@/lib/commands';
import { ModalBuilder, } from '@discordjs/builders';
import {
  MessageFlags,
  SlashCommandBuilder,

  type ChatInputCommandInteraction,
} from 'discord.js';

import buildSetProfileComponent from './sub/setProfile';


export default command(
  new SlashCommandBuilder()
    .setName('profile')
    .setDescription('control your profile')
    .addSubcommand(sc =>
      sc.setName('set')
        .setDescription('register your profile')
    ).addSubcommand(sc =>
      sc.setName('show')
        .setDescription('show your profile')
    )
  ,
  async (interaction: ChatInputCommandInteraction) => {
    const sc = interaction.options.getSubcommand()

    const userId = interaction.user.id;
    const guildId = interaction.guildId ?? "";

    if (sc === 'set') {
      const components = await buildSetProfileComponent(userId, guildId);
      const modal = new ModalBuilder()
        .setCustomId('profile-modal')
        .setTitle('Set Your Profile')
      for (const c of components) {
        modal.addComponents(c);
      }
      await interaction.showModal(modal);
      return;
    }

    const name = 'Cocoalix Mochamalefic';
    const server = 'Atomos';

    await interaction.reply({
      content: `  NAME: ${name}\nSERVER: ${server}`,
      ephemeral: true,
    });
  }
);

