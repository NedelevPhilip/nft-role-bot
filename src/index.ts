import { Client, GatewayIntentBits, Partials } from "discord.js";
import * as dotenv from "dotenv";
import { handleMessage } from "./messageHandler";

dotenv.config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
	],
	partials: [Partials.Message, Partials.Channel, Partials.GuildMember]
});

client.once("ready", () => {
	console.log(`🤖 Bot is ready as ${client.user?.tag}`);
});

client.on("messageCreate", (message) => handleMessage(client, message));

client.login(process.env.BOT_TOKEN);