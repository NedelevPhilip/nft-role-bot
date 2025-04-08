import { Client, Message } from "discord.js";
import { isAddress } from "ethers";
import { checkNFTOwnership } from "./nftChecker";

export async function handleMessage(client: Client, message: Message) {
  if (!message.content.startsWith("!verify") || message.author.bot) return;

  const [, wallet] = message.content.split(" ");
  if (!wallet || !isAddress(wallet)) {
    return message.reply("❌ Невалидный адрес кошелька");
  }

  try {
    const nftInfo = await checkNFTOwnership(wallet);

    if (nftInfo.hasNFT) {
      const role = message.guild?.roles.cache.find(r => r.name === nftInfo.roleName);
      if (role && message.member) {
        await message.member.roles.add(role);
        return message.reply(`✅ Доступ выдан! Назначена роль: ${role.name}`);
      }
    } else {
      return message.reply("❌ У вас нет нужных NFT");
    }
  } catch (error) {
    console.error("Ошибка при проверке NFT:", error);
    message.reply("⚠️ Произошла ошибка. Попробуйте позже.");
  }
}