import { uintCV, principalCV } from "@stacks/transactions";
import { callReadOnly } from "stacks-contracts-sdk";
import type { ContractCallOptions } from "stacks-types-sdk";
import { API_URLS } from "stacks-types-sdk";

export async function getNftOwner(
  nftContract: string,
  tokenId: number,
  senderAddress: string,
  networkUrl: string = API_URLS.mainnet
): Promise<string | null> {
  const [addr, name] = nftContract.split(".");
  try {
    const result = await callReadOnly(
      addr, name, "get-owner",
      [uintCV(tokenId).toString()],
      senderAddress, networkUrl
    );
    return result?.value?.value ?? null;
  } catch {
    return null;
  }
}

export async function getLastTokenId(
  nftContract: string,
  senderAddress: string,
  networkUrl: string = API_URLS.mainnet
): Promise<number> {
  const [addr, name] = nftContract.split(".");
  try {
    const result = await callReadOnly(
      addr, name, "get-last-token-id", [],
      senderAddress, networkUrl
    );
    return Number(result?.value ?? 0);
  } catch {
    return 0;
  }
}
