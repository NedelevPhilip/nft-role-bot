import { REST, Routes, SlashCommandBuilder } from "discord.js";
import * as dotenv from "dotenv";

dotenv.config();

const commands = [
  new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Verify your wallet to get roles")
    .addStringOption(option =>
      option
        .setName("wallet")
        .setDescription("Your wallet address")
        .setRequired(true)
    )
    .toJSON()
];

const rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN!);

(async () => {
  try {
    console.log("🌀 Registering slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID!,
        process.env.GUILD_ID!
      ),
      { body: commands }
    );
    console.log("✅ Slash commands registered successfully");
  } catch (error) {
    console.error("❌ Failed to register commands:", error);
  }
})();