import { command } from "@/lib/commands";
import { awaitModal } from "@/lib/modals";
import { ModalBuilder, TextInputBuilder } from "@discordjs/builders";
import {
  ActionRowBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
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

const f = () => {
  console.log("bbb");
  return [
    new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId(def.name.customId)
        .setLabel(def.name.label)
        .setStyle(TextInputStyle.Short)
    ),
    new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId(def.server.customId)
        .setLabel(def.server.label)
        .setStyle(TextInputStyle.Short)
    ),
  ];
}

export default f;
