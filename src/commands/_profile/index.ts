import { command } from '@/lib/commands';
import { awaitModal } from '@/lib/modals';
import { ModalBuilder, } from '@discordjs/builders';
import {
  MessageFlags,
  SlashCommandBuilder,

  type ChatInputCommandInteraction,
} from 'discord.js';

import {
  getProfileFirstByUserIdAndGuildId,
  upsert,
} from '@/stores/profile'
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

    const profile = await getProfileFirstByUserIdAndGuildId(userId, guildId) ?? { name: "", server: "" };

    if (sc === 'set') {
      const components = await buildSetProfileComponent(profile.name, profile.server);
      const modal = new ModalBuilder()
        .setCustomId('profile-modal')
        .setTitle('Set Your Profile')
      for (const c of components) {
        modal.addComponents(c);
      }
      await interaction.showModal(modal);

      // logic for after modal submit
      const modalInteraction = await awaitModal('profile-modal');

      const name = modalInteraction.fields.getTextInputValue('name')
      const server = modalInteraction.fields.getTextInputValue('server')
      upsert(userId, guildId, name, server);

      await modalInteraction.reply(
        `Modal submited: ${modalInteraction.fields.getTextInputValue('name')}#${modalInteraction.fields.getTextInputValue('server')}`
      );
      return;
    }

    await interaction.reply({
      content: `  NAME: ${profile.name}\nSERVER: ${profile.server}`,
      flags: MessageFlags.Ephemeral,
    });
  }
);

