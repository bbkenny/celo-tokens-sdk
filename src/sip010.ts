import { uintCV, principalCV, noneCV } from "@stacks/transactions";
import { callReadOnly } from "stacks-contracts-sdk";
import type { ContractCallOptions } from "cest-types-sdk";
import { API_URLS } from "cest-types-sdk";

export function sip010Transfer(
  tokenContract: string,
  tokenAddress: string,
  amount: bigint,
  sender: string,
  recipient: string,
  senderKey: string,
  network?: any
): ContractCallOptions {
  const [addr, name] = tokenContract.split(".");
  return {
    contractAddress: addr,
    contractName: name,
    functionName: "transfer",
    functionArgs: [
      uintCV(amount),
      principalCV(sender),
      principalCV(recipient),
      noneCV(),
    ],
    senderKey,
    network,
  };
}

export async function getSip010Balance(
  tokenContract: string,
  holderAddress: string,
  networkUrl: string = API_URLS.mainnet
): Promise<bigint> {
  const [addr, name] = tokenContract.split(".");
  const result = await callReadOnly(
    addr, name, "get-balance", [],
    holderAddress, networkUrl
  );
  return BigInt(result?.value ?? 0);
}

export async function getSip010Metadata(
  tokenContract: string,
  senderAddress: string,
  networkUrl: string = API_URLS.mainnet
): Promise<{ name: string; symbol: string; decimals: number }> {
  const [addr, name] = tokenContract.split(".");
  const [nameResult, symbolResult, decimalsResult] = await Promise.all([
    callReadOnly(addr, name, "get-name", [], senderAddress, networkUrl),
    callReadOnly(addr, name, "get-symbol", [], senderAddress, networkUrl),
    callReadOnly(addr, name, "get-decimals", [], senderAddress, networkUrl),
  ]);
  return {
    name: nameResult?.value ?? "",
    symbol: symbolResult?.value ?? "",
    decimals: Number(decimalsResult?.value ?? 0),
  };
}
