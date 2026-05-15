import { API_URLS } from "stacks-types-sdk";
import { callReadOnly } from "stacks-contracts-sdk";

export async function getStxBalance(
  address: string,
  networkUrl: string = API_URLS.mainnet
): Promise<{ balance: bigint; locked: bigint; available: bigint }> {
  const resp = await fetch(`${networkUrl}/extended/v1/address/${address}/balances`);
  if (!resp.ok) throw new Error(`Failed to fetch balance: ${resp.status}`);
  const data = await resp.json();
  const balance = BigInt(data.stx.balance);
  const locked = BigInt(data.stx.locked);
  return { balance, locked, available: balance - locked };
}
