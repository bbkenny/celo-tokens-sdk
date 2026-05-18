# celo-tokens-sdk

Native CELO, ERC-20, and ERC-721 token utilities for Celo blockchain using ethers.js.

## Install

```bash
npm install celo-tokens-sdk
```

## Usage

```typescript
import { getCeloBalance, transferCelo, getErc20Balance, transferErc20, getErc20Metadata } from "celo-tokens-sdk";

// 1. Native CELO
const balance = await getCeloBalance("0x...");
console.log("Celo balance:", balance.toString());

const txHash = await transferCelo("private-key", "recipient-address", 1000000000000000000n);

// 2. ERC-20 (e.g. cUSD)
const cUSDAddress = "0x765de816845861e75a25fca122bb6898b8b1282a";
const erc20Bal = await getErc20Balance(cUSDAddress, "0xHolderAddress");

const transferHash = await transferErc20(cUSDAddress, "private-key", "recipient-address", 500000000000000000n);

const metadata = await getErc20Metadata(cUSDAddress);
console.log(`Token: ${metadata.name} (${metadata.symbol}), Decimals: ${metadata.decimals}`);
```

## API

### Native CELO
- `getCeloBalance(address, providerUrl?)` — Returns the native CELO balance in wei.
- `transferCelo(privateKey, recipient, amount, providerUrl?)` — Send native CELO. Returns transaction hash.

### ERC-20 Tokens
- `getErc20Balance(tokenAddress, holderAddress, providerUrl?)` — Query ERC-20 balance.
- `transferErc20(tokenAddress, privateKey, recipient, amount, providerUrl?)` — Transfer ERC-20 tokens. Returns transaction hash.
- `getErc20Metadata(tokenAddress, providerUrl?)` — Fetch ERC-20 name, symbol, and decimals.

### ERC-721 NFTs
- `getNftOwner(nftAddress, tokenId, providerUrl?)` — Query owner address of an NFT.
- `getNftUri(nftAddress, tokenId, providerUrl?)` — Fetch metadata URI of an NFT.

## License

MIT

## Author

bbkenny
