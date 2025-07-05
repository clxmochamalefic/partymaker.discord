import { TextInputBuilder } from "@discordjs/builders";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CacheType,
  ModalSubmitInteraction,
  StringSelectMenuBuilder,
  TextInputStyle,
} from "discord.js";

import { isNullOrWhitespace } from "@/utils/validator"

const def = {
  title: {
    customId: "title",
  },
  begin: {
    customId: "begin",
  },
  end: {
    customId: "end",
  },
}

type OwnerProfile = {
  id: number;
  guildId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  name: string;
  userId: string;
  server: string;
};

type Event = {
  ownerProfile: OwnerProfile | null;
  id: number,
  title: string,
  guildId: string,
  ownerProfileId: number,
  beginDateTime: Date,
  endTermHour: number,
}

const build = (eventList: Event[]) => {

  const showButton = new ButtonBuilder()
    .setCustomId('event-show-button')
    .setLabel('show')
    .setStyle(ButtonStyle.Link);

  // for approve (add to discord-guild event) 承認ボタン (discordのサーバにイベントとして追加されます
  const approveButton = new ButtonBuilder()
    .setCustomId('event-approve-button')
    .setLabel('approve')
    .setStyle(ButtonStyle.Primary);

  const eventSelection = new StringSelectMenuBuilder()
    .setCustomId('event-selection')
    .setOptions(eventList.map(v => ({
      label: `${v.title} (${v.ownerProfile.name}#${v.ownerProfile.server})`,
      value: v.id
    })));

  return [
    new ActionRowBuilder<ButtonBuilder>().addComponents(showButton),
    new ActionRowBuilder<ButtonBuilder>().addComponents(approveButton),
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(eventSelection),
  ];
}

export default build;

