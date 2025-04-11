import { ChatInputCommandInteraction } from "discord.js";
import { isAddress } from "ethers";
import { checkNFTRoles } from "./nftChecker";
import { GuildMember } from "discord.js";

const allRoleNames = ["VIP", "OG"];

export async function handleMessage(interaction: ChatInputCommandInteraction) {
	if (interaction.commandName !== "verify") return;

	const wallet = interaction.options.getString("wallet", true);

	if (!isAddress(wallet)) {
		return interaction.reply({ content: "❌ Invalid wallet address", ephemeral: true });
	}

	await interaction.deferReply({ ephemeral: true });

	const rolesToAssign = await checkNFTRoles(wallet);
	const member = interaction.member as GuildMember;

	if (!member || !("roles" in member)) return;

	for (const roleName of allRoleNames) {
		const role = interaction.guild?.roles.cache.find(r => r.name === roleName);
		if (role && member.roles.cache.has(role.id)) {
			await member.roles.remove(role);
		}
	}

	if (rolesToAssign.length === 0) {
		return interaction.editReply("✅ You don't own any verified NFTs. All NFT-based roles have been removed.");
	}

	for (const roleName of rolesToAssign) {
		const role = interaction.guild?.roles.cache.find(r => r.name === roleName);
		if (role) {
			await member.roles.add(role);
		}
	}

	return interaction.editReply(`✅ Roles updated: ${rolesToAssign.join(", ")}`);
}
