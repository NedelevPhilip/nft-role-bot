import { Client, Message } from "discord.js";
import { isAddress } from "ethers";
import { checkNFTRoles } from "./nftChecker";

export async function handleMessage(client: Client, message: Message) {
	if (!message.content.startsWith("!verify") || message.author.bot) return;

	const [, wallet] = message.content.split(" ");
	if (!wallet || !isAddress(wallet)) {
		return message.reply("❌ Invalid wallet address");
	}

	try {
		const roles = await checkNFTRoles(wallet);

		if (roles.length === 0) {
			return message.reply("❌ You don't own any required NFTs");
		}

		for (const roleName of roles) {
			const role = message.guild?.roles.cache.find(r => r.name === roleName);
			if (role && message.member) {
				await message.member.roles.add(role);
			}
		}

		return message.reply(`✅ Roles assigned: ${roles.join(", ")}`);
	} catch (error) {
		console.error("Error checking NFT roles:", error);
		message.reply("⚠️ An error occurred while checking your NFTs. Please try again later.");
	}
}