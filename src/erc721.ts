import { ethers } from "ethers";
import { CELO_MAINNET_RPC } from "cest-types-sdk";

const ERC721_ABI = [
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenURI(uint256 tokenId) view returns (string)"
];

export async function getNftOwner(
  nftAddress: string,
  tokenId: number,
  providerUrl: string = CELO_MAINNET_RPC
): Promise<string> {
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const contract = new ethers.Contract(nftAddress, ERC721_ABI, provider);
  return contract.ownerOf(tokenId);
}

export async function getNftUri(
  nftAddress: string,
  tokenId: number,
  providerUrl: string = CELO_MAINNET_RPC
): Promise<string> {
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const contract = new ethers.Contract(nftAddress, ERC721_ABI, provider);
  return contract.tokenURI(tokenId);
}
