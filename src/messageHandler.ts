import { Client, Message } from "discord.js";
import { isAddress } from "ethers";
import { checkNFTRoles } from "./nftChecker";

export async function handleMessage(client: Client, message: Message) {
	if (!message.content.startsWith("!verify") || message.author.bot) return;

	const [, wallet] = message.content.split(" ");
	if (!wallet || !isAddress(wallet)) {
		return message.reply("❌ Невалидный адрес кошелька");
	}

	try {
		const roles = await checkNFTRoles(wallet);

		if (roles.length === 0) {
			return message.reply("❌ У вас нет нужных NFT для доступа");
		}

		for (const roleName of roles) {
			const role = message.guild?.roles.cache.find(r => r.name === roleName);
			if (role && message.member) {
				await message.member.roles.add(role);
			}
		}

		return message.reply(`✅ Вам назначены роли: ${roles.join(", ")}`);
	} catch (error) {
		console.error("Ошибка при проверке NFT:", error);
		message.reply("⚠️ Произошла ошибка при проверке. Попробуйте позже.");
	}
}