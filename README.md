# 🐶 Digital Pet

Digital Pet is an interactive web application where users can raise a virtual pet, manage its stats, and interact with an IOTA wallet on the **devnet**. Users can connect their wallet, claim XP, buy gifts, and monitor their MIOTA balance.

## 🚀 Features

- Raise a virtual pet with stats: Hunger, Energy, Happiness, Fun, XP, Level.
- Interact with the pet: Feed, Play, Sleep, Bath.
- Claim XP to IOTA wallet.
- Buy gifts for the pet using MIOTA.
- Connect to IOTA Devnet wallet via `@iota/dapp-kit`.
- Display wallet address and MIOTA balance.

## 🌐 IOTA Wallet Connection

- Devnet Node: `https://api.lb-0.h.chrysalis-devnet.iota.cafe`
- Faucet: `https://faucet.devnet.iota.org`

Instructions:

1. Click **Connect**.
2. Choose a wallet or create a test wallet.
3. After connecting, the **address** and **MIOTA balance** are displayed.
4. Claim XP or buy gifts using your MIOTA balance.

## 🗂️ Project Structure

digital_pet/
│
├─ app/
│  ├─ page.tsx
│  └─ Providers.tsx
├─ components/
│  ├─ WalletContext.tsx
│  ├─ WalletConnect.tsx
│  └─ PetCard.tsx
├─ lib/
│  └─ config.ts
├─ package.json
├─ tsconfig.json
└─ README.md

## 🔧 Extensions

- Add multiple pets, items, and mini-games.
- Store pet state on the blockchain (IOTA Tangle).
- Responsive UI with animations for pets.
- Support multiple IOTA networks.

## 📌 Notes

- The project uses the **IOTA devnet** for testing purposes.
- Do not use real mainnet wallets for development/testing.
- Claiming XP or buying gifts only affects **test MIOTA**.

  0xdd8fc1a3c66090acbe3a0268e43ba29e8141ea73148d1b6f2c8ad7fd1a41857c
  <img width="1685" height="812" alt="image" src="https://github.com/user-attachments/assets/9e9fc14f-da9e-47f0-ba61-914d0b12d72d" />


## 📜 License

MIT License © 2025
