interface NFTResponse {
	nfts: string[]; // list of NFT identifiers
}

const roleMapping: Record<string, string[]> = {
	"VIP-NFT": ["VIP"],
	"OG-PASS": ["OG"],
};

export async function checkNFTRoles(wallet: string): Promise<string[]> {
	console.log(`Mock fetch NFTs for wallet: ${wallet}`);

	// Mocked response from external API
	const mockNFTs: Record<string, string[]> = {
		"0x85D...": ["VIP-NFT"],
		"0x83D...": ["OG-PASS"],
		"0x81D...": ["VIP-NFT", "OG-PASS"],
		"0x43f...": []
	};

	const userNFTs = mockNFTs[wallet] || [];

	const roles = new Set<string>();
	for (const nft of userNFTs) {
		const mappedRoles = roleMapping[nft];
		if (mappedRoles) {
			mappedRoles.forEach(role => roles.add(role));
		}
	}

	console.log(`Roles mapped for wallet ${wallet}: ${Array.from(roles).join(", ")}`);
	return Array.from(roles);
}