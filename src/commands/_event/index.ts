import { TextInputBuilder } from "@discordjs/builders";
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
} from '@/stores/profile'

import {
  upsert,
} from '@/stores/event'

import buildCreateEventComponent from './sub/create';
import buildEditEventComponent, {
  getValueByModalInteraction
} from './sub/edit';

export default command(
  new SlashCommandBuilder()
    .setName('event')
    .setDescription('control your event')
    .addSubcommand(sc => sc.setName('create').setDescription('register your event'))
    .addSubcommand(sc => sc.setName('edit').setDescription('edit your event'))
    .addSubcommand(sc => sc.setName('show').setDescription('show events in this server'))
    .addSubcommand(sc => sc.setName('show_own').setDescription('show events in this server'))
  ,
  async (interaction: ChatInputCommandInteraction) => {
    const sc = interaction.options.getSubcommand()

    switch (sc) {
      case 'create':
        return await create(interaction);
      case 'edit':
        return await edit(interaction);
      default:
        break;
    }

    //await interaction.reply({
    //  content: `  NAME: ${profile.name}\nSERVER: ${profile.server}`,
    //  flags: MessageFlags.Ephemeral,
    //});
  }
);

async function create(interaction: ChatInputCommandInteraction) {
  const userId = interaction.user.id;
  const guildId = interaction.guildId ?? "";

  const profile = await getProfileFirstByUserIdAndGuildId(userId, guildId);

  if (profile === null) {
    interaction.reply({
      content: "ABORT: you couldnot use this command now\n"
        + "because this BOT hasnot your profile for this Discrod-Server\n"
        + "\n"
        + "NEED: plz use this SlashCommand => `/profile set` and create your profile"
      , flags: MessageFlags.Ephemeral
    })
  }

  const components = buildCreateEventComponent();

  const modalCustomId = 'event-create-modal'
  const modal = new ModalBuilder()
    .setCustomId(modalCustomId)
    .setTitle('Create a new Event')

  //modal.setComponents(components);
  for (const c of components) {
    modal.addComponents(c);
  }
  await interaction.showModal(modal);

  // logic for after modal submit
  const modalInteraction = await awaitModal(modalCustomId);

  const values = getValueByModalInteraction(modalInteraction);
  await upsert(profile!.id, guildId, values.title, values.begin, values.end);

  await modalInteraction.reply(
    "created!!:\n"
    + `title: ${values.title}\n`
    + `begin: ${values.begin}\n`
    + `end: ${values.end} hour${values.end < 2 ? "" : "s"}\n`
    //`Modal submited: ${modalInteraction.fields.getTextInputValue('name')}#${modalInteraction.fields.getTextInputValue('server')}`
  );

  return;
}

async function edit(interaction: ChatInputCommandInteraction) {
}
async function show(interaction: ChatInputCommandInteraction) {
}
