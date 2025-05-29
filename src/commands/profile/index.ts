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
} from 'discord.js';

import getProfileComponent from '@/components/profile/setProfileComp';

const profileComponents = getProfileComponent();

export default command(
  new SlashCommandBuilder()
    .setName('set-profile')
    .setDescription('register your profile')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async (interaction) => {
    const components = [
      new ActionRowBuilder<TextInputBuilder>().addComponents(profileComponents[0]),
      new ActionRowBuilder<TextInputBuilder>().addComponents(profileComponents[1]),
      //new ActionRowBuilder<ButtonBuilder>().addComponents(profileComponents[2]),
    ];

  const modal = new ModalBuilder()
    .setCustomId('profile-modal')
    .setTitle('Set Your Profile')

  for (const c of components) {
    modal.addComponents(c);
  }

  await interaction.showModal(modal);

  const modalInteraction = await awaitModal('profile-modal');

  await modalInteraction.reply(
    `Modal submited: ${modalInteraction.fields.getTextInputValue('name')}#${modalInteraction.fields.getTextInputValue('server')}`
  );
  }
);

