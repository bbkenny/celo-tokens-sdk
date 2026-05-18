import { ethers } from "ethers";
import { CELO_MAINNET_RPC } from "cest-types-sdk";

export async function getCeloBalance(
  address: string,
  providerUrl: string = CELO_MAINNET_RPC
): Promise<bigint> {
  const provider = new ethers.JsonRpcProvider(providerUrl);
  return provider.getBalance(address);
}

export async function transferCelo(
  privateKey: string,
  recipient: string,
  amount: bigint,
  providerUrl: string = CELO_MAINNET_RPC
): Promise<string> {
  const provider = new ethers.JsonRpcProvider(providerUrl);
  const wallet = new ethers.Wallet(privateKey, provider);
  const tx = await wallet.sendTransaction({
    to: recipient,
    value: amount,
  });
  await tx.wait();
  return tx.hash;
}
