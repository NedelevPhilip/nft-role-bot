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
		"0x85D65f607c59A09F43d88999B7A0B43f55Eb18D8": ["VIP-NFT"],
		"0x85D65f677c59A339F43d88999B7A0B43f55Eb18D1": ["OG-PASS"],
		"0x43fcCdE584991D1BEEbf79620279b997378687dc": ["VIP-NFT", "OG-PASS"],
		"0x43fcCdE584991D1BEEbf79620279b999978687bg": []
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