import { Contract, JsonRpcProvider } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

const provider = new JsonRpcProvider(process.env.RPC_URL);

const contracts = [
  {
    address: process.env.NFT_CONTRACT_1!,
    role: "NFT Holder",
    abi: ["function balanceOf(address owner) view returns (uint256)"]
  }
];

export async function checkNFTOwnership(wallet: string): Promise<{ hasNFT: boolean, roleName: string }> {
  for (const contract of contracts) {
    const nftContract = new Contract(contract.address, contract.abi, provider);
    const balance = await nftContract.balanceOf(wallet);
    if (balance > 0n) {
      return { hasNFT: true, roleName: contract.role };
    }
  }
  return { hasNFT: false, roleName: "" };
}