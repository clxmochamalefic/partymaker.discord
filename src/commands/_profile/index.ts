import { command } from '@/lib/commands';
import { awaitModal } from '@/lib/modals';
import { ButtonBuilder, ModalBuilder, TextInputBuilder } from '@discordjs/builders';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  TextInputBuilder,
  TextDisplayBuilder,

  type ChatInputCommandInteraction,
} from 'discord.js';

import getProfileComponent from './sub/setProfile';

const profileComponents = getProfileComponent();

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

    if (sc === 'set') {
      const modal = new ModalBuilder()
        .setCustomId('profile-modal')
        .setTitle('Set Your Profile')
      for (const c of profileComponents) {
        modal.addComponents(c);
      }
      await interaction.showModal(modal);
      return;
    }

    const name = 'Cocoalix Mochamalefic';
    const server = 'Atomos';

    await interaction.reply({
      content: `NAME: ${name}\nSERVER: ${server}`,
      ephemeral: true,
    });
  }
);

