import { TextInputBuilder } from "@discordjs/builders";
import {
  ActionRowBuilder,
  TextInputStyle,
} from "discord.js";

const def = {
  name: {
    customId: "name",
    label: "tell me your name in Eorzea(FFXIV)",
  },
  server: {
    customId: "server",
    label: "tell me your server in Eorzea(FFXIV)",
  },
  save: {
    customId: "button-save",
    label: "Save/保存",
  },
};

const f = async (name: string, server: string) => {
  return [
    new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId(def.name.customId)
        .setLabel(def.name.label)
        .setStyle(TextInputStyle.Short)
        .setValue(name)
    ),
    new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId(def.server.customId)
        .setLabel(def.server.label)
        .setStyle(TextInputStyle.Short)
        .setValue(server)
    ),
  ];
}

export default f;
