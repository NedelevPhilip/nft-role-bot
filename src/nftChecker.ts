import { Contract, JsonRpcProvider } from "ethers";
import * as dotenv from "dotenv";
import { NFTContract } from "./types";

dotenv.config();

const provider = new JsonRpcProvider(process.env.RPC_URL);

const contracts: NFTContract[] = [
	{
		address: process.env.NFT_CONTRACT_1!,
		role: "Holder",
		abi: ["function balanceOf(address owner) view returns (uint256)"]
	},
	{
		address: process.env.NFT_CONTRACT_2!,
		role: "VIP",
		abi: ["function balanceOf(address owner) view returns (uint256)"]
	},
	{
		address: process.env.NFT_CONTRACT_3!,
		role: "OG",
		abi: ["function balanceOf(address owner) view returns (uint256)"]
	}
];

export async function checkNFTRoles(wallet: string): Promise<string[]> {
	const roles: string[] = [];

	for (const contract of contracts) {
		const nftContract = new Contract(contract.address, contract.abi, provider);
		const balance = await nftContract.balanceOf(wallet);
		if (balance > 0n) {
			roles.push(contract.role);
		}
	}

	return roles;
}