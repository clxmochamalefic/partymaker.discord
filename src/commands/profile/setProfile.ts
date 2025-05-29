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

export default command(
  new SlashCommandBuilder()
    .setName("set-profile")
    .setDescription("register your profile")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async (interaction) => {
    const components = [
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

    const modal = new ModalBuilder()
      .setCustomId("profile-modal")
      .setTitle("Set Your Profile");

    for (const c of components) {
      modal.addComponents(c);
    }

    await interaction.showModal(modal);

    const modalInteraction = await awaitModal("profile-modal");

    await modalInteraction.reply(
      `Modal submited: ${modalInteraction.fields.getTextInputValue("name")}#${modalInteraction.fields.getTextInputValue("server")}`
    );
  },
);
