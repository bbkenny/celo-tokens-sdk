# bbkenny-stacks-helpers-tokens

STX, SIP-010 fungible token, and SIP-009 NFT helpers for Stacks L2.

## Install

```bash
npm install bbkenny-stacks-helpers-tokens
```

## Usage

```typescript
import { getStxBalance, getSip010Balance, sip010Transfer, getNftOwner } from "bbkenny-stacks-helpers-tokens";

// Get STX balance
const balance = await getStxBalance("SP...");

// Get SIP-010 token balance
const tokenBalance = await getSip010Balance("SP...token-contract", "SP...holder");

// Build SIP-010 transfer call
const transferCall = sip010Transfer("SP.token-contract", "SP.sender", 1000000n, "SP.sender", "SP.recipient", "sender-private-key");

// Get NFT owner
const owner = await getNftOwner("SP.nft-contract", 1, "SP.viewer");
```

## API

### STX
- `getStxBalance(address, networkUrl?)` — Returns `{ balance, locked, available }`

### SIP-010 (Fungible Tokens)
- `sip010Transfer(tokenContract, amount, sender, recipient, senderKey, network?)` — Build transfer call
- `getSip010Balance(tokenContract, holderAddress, networkUrl?)` — Get token balance
- `getSip010Metadata(tokenContract, senderAddress, networkUrl?)` — Get `{ name, symbol, decimals }`

### SIP-009 (NFTs)
- `getNftOwner(nftContract, tokenId, senderAddress, networkUrl?)` — Get NFT owner
- `getLastTokenId(nftContract, senderAddress, networkUrl?)` — Get last minted token ID

## License

MIT

## Author

bbkenny
