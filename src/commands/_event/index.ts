import { TextInputBuilder } from "@discordjs/builders";
import { command } from '@/lib/commands';
import { awaitModal } from '@/lib/modals';
import { ModalBuilder, } from '@discordjs/builders';
import {
  ActionRowBuilder,
  MessageFlags,
  SlashCommandBuilder,
  type ChatInputCommandInteraction,
} from 'discord.js';

import {
  getProfileFirstByUserIdAndGuildId,
} from '@/stores/profile'

import {
  getEventByGuildId,
  getEventOnceByGuildIdAndProfileId,
  upsert,
} from '@/stores/event'

import buildCreateEventComponent from './sub/create';
import buildEditEventComponent, {
  getValueByModalInteraction
} from './sub/edit';
import buildShowEventComponent from './sub/show';

type ComponentCallback = (profileId: number) => Promise<ActionRowBuilder<TextInputBuilder>[]>;

enum Subcommand {
  create = 'create',
  edit = 'edit',
  show = 'show',
  showOwn = 'show_own',
}

export default command(
  new SlashCommandBuilder()
    .setName('event')
    .setDescription('control your event')
    .addSubcommand(sc => sc.setName(Subcommand.create).setDescription('register your event'))
    .addSubcommand(sc => sc.setName(Subcommand.edit).setDescription('edit your event'))
    .addSubcommand(sc => sc.setName(Subcommand.show).setDescription('show events in this server'))
    .addSubcommand(sc => sc.setName(Subcommand.showOwn).setDescription('show only your own events in this server'))
  ,
  async (interaction: ChatInputCommandInteraction) => {
    const sc = interaction.options.getSubcommand()

    switch (sc) {
      case Subcommand.create:
        return await create(interaction);
      case Subcommand.edit:
        return await edit(interaction);
      case Subcommand.show:
        return await show(interaction);
      case Subcommand.showOwn:
        return await showOwn(interaction);
      default:
        break;
    }
  }
);

async function create(interaction: ChatInputCommandInteraction) {
  await _edit(interaction, 'event-create-modal', async (_) => buildCreateEventComponent())
  return;
}

async function edit(interaction: ChatInputCommandInteraction) {
  const guildId = interaction.guildId ?? "";

  await _edit(interaction, 'event-edit-modal', async (profileId: number) => {
    const event = await getEventOnceByGuildIdAndProfileId(guildId, profileId);
    if (event === null) {
      interaction.reply({
        content: "ABORT: EVENT NOT FOUND\n"
          + "you couldnot use this command now\n"
          + "because this BOT hasnot your profile for this Discrod-Server\n"
          + "\n"
          + "NEED: plz use this SlashCommand => `/profile set` and create your profile"
        , flags: MessageFlags.Ephemeral
      });
      return [];
    }
    return buildEditEventComponent(event.title ?? "", event.beginDateTime.toLocaleString(), event.endTermHour);
  });
}
async function show(interaction: ChatInputCommandInteraction) {
  const userId = interaction.user.id;
  const guildId = interaction.guildId ?? "";

  const profile = await getProfileFirstByUserIdAndGuildId(userId, guildId);
  if (profile === null) {
    interaction.reply({
      content: "ABORT: YOUR PROFILE NOT FOUND\n"
        + "you couldnot use this command now\n"
        + "because this BOT hasnot your profile for this Discrod-Server\n"
        + "\n"
        + "NEED: plz use this SlashCommand => `/profile set` and create your profile"
      , flags: MessageFlags.Ephemeral
    });
    return;
  }

  const eventList = await getEventByGuildId(guildId);
  buildShowEventComponent(eventList)
}
async function showOwn(interaction: ChatInputCommandInteraction) {
}


async function _edit(
  interaction: ChatInputCommandInteraction,
  modalCustomId: string,
  getComponentFn: ComponentCallback
) {
  const userId = interaction.user.id;
  const guildId = interaction.guildId ?? "";

  const profile = await getProfileFirstByUserIdAndGuildId(userId, guildId);
  if (profile === null) {
    interaction.reply({
      content: "ABORT: YOUR PROFILE NOT FOUND\n"
        + "you couldnot use this command now\n"
        + "because this BOT hasnot your profile for this Discrod-Server\n"
        + "\n"
        + "NEED: plz use this SlashCommand => `/profile set` and create your profile"
      , flags: MessageFlags.Ephemeral
    });
    return;
  }

  const modal = new ModalBuilder()
    .setCustomId(modalCustomId)
    .setTitle('Create a new Event')

  const components = await getComponentFn(profile.id);
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
  );

  return;
}
