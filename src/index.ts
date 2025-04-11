import { Client, GatewayIntentBits, Partials, Events } from "discord.js";
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

client.on(Events.InteractionCreate, async (interaction) => {
	if (interaction.isChatInputCommand()) {
		await handleMessage(interaction);
	}
});

client.on(Events.GuildMemberAdd, async (member) => {
	try {
		await member.send(
			`👋 Welcome to the server!
			Please go to the #verify channel and run the \`/verify\` command with your wallet address to get access.`
		);
	} catch (err) {
		console.warn("Could not send DM to new member:", err);
	}
});

client.login(process.env.BOT_TOKEN);