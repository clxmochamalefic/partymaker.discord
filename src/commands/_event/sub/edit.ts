import { TextInputBuilder } from "@discordjs/builders";
import {
  ActionRowBuilder,
  CacheType,
  ModalSubmitInteraction,
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

const build = (title: string, begin: string, end: number = 1) => {
  return [
    new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId(def.title.customId)
        .setLabel("event title / イベント名")
        .setStyle(TextInputStyle.Short)
        .setValue(title)
    ),
    new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId(def.begin.customId)
        .setLabel("begin date-time / イベント開始日時")
        .setStyle(TextInputStyle.Short)
        .setValue(begin)
    ),
    new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId(def.end.customId)
        .setLabel("end of term (hours) / 開催期間(時間)")
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('1')
        .setValue(`${end}`)
    ),
  ];
}

export function getValueByModalInteraction(interaction: ModalSubmitInteraction<CacheType>) {
  const title = interaction.fields.getTextInputValue(def.title.customId);
  const begin = interaction.fields.getTextInputValue(def.begin.customId);
  const endStr = interaction.fields.getTextInputValue(def.end.customId);
  const end = Number.parseInt(endStr);

  const beginError = new Error(`begin: ${begin}`);
  const endError = new Error(`end: ${endStr}`);
  if (isNullOrWhitespace(begin)) {
    throw beginError;
  }
  if (isNullOrWhitespace(endStr)) {
    throw endError;
  } else if (Number.isNaN(end)) {
    throw endError;
  }

  return {
    title: title,
    begin: begin,
    end: end,
  }
}

export default build;

