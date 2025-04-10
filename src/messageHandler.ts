import { Client, Message } from "discord.js";
import { isAddress } from "ethers";
import { checkNFTRoles } from "./nftChecker";

const allRoleNames = ["VIP", "OG"];

export async function handleMessage(client: Client, message: Message) {
	if (!message.content.startsWith("!verify") || message.author.bot) return;

	const [, wallet] = message.content.split(" ");
	if (!wallet || !isAddress(wallet)) {
		return message.reply("❌ Invalid wallet address");
	}

	try {
		const rolesToAssign = await checkNFTRoles(wallet);

		const member = message.member;
		if (!member) return;

		const guild = message.guild;
		if (!guild) return;

		// Remove all managed roles first
		for (const roleName of allRoleNames) {
			const role = guild.roles.cache.find(r => r.name === roleName);
			if (role && member.roles.cache.has(role.id)) {
				await member.roles.remove(role);
			}
		}

		if (rolesToAssign.length === 0) {
			return message.reply("❌ You don't own any verified NFTs. All NFT-based roles have been removed.");
		}

		for (const roleName of rolesToAssign) {
			const role = guild.roles.cache.find(r => r.name === roleName);
			if (role) {
				await member.roles.add(role);
			}
		}

		return message.reply(`✅ Roles updated: ${rolesToAssign.join(", ")}`);
	} catch (error) {
		console.error("Error checking NFT roles:", error);
		message.reply("⚠️ An error occurred while checking your NFTs. Please try again later.");
	}
}
