import { ethers } from "ethers";
import { CELO_MAINNET_RPC } from "cest-types-sdk";
import type { Erc20Metadata } from "cest-types-sdk";

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 value) returns (bool)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)"
];

export async function getErc20Balance(
  tokenAddress: string,
  holderAddress: string,
  providerUrl: string = CELO_MAINNET_RPC
): Promise<bigint> {
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  return contract.balanceOf(holderAddress);
}

export async function transferErc20(
  tokenAddress: string,
  privateKey: string,
  recipient: string,
  amount: bigint,
  providerUrl: string = CELO_MAINNET_RPC
): Promise<string> {
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, wallet);
  const tx = await contract.transfer(recipient, amount);
  await tx.wait();
  return tx.hash;
}

export async function getErc20Metadata(
  tokenAddress: string,
  providerUrl: string = CELO_MAINNET_RPC
): Promise<Erc20Metadata> {
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const [name, symbol, decimals] = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.decimals()
  ]);
  return { name, symbol, decimals: Number(decimals) };
}
