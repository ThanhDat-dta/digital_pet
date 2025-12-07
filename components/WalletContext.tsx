"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface WalletInfo {
  address: string;
  balance: number;
}

const WalletContext = createContext<{
  wallet: WalletInfo;
  setWallet: (w: WalletInfo) => void;
}>({
  wallet: { address: "", balance: 0 },
  setWallet: () => {},
});

export function useWallet() {
  return useContext(WalletContext);
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletInfo>({ address: "", balance: 1000 }); // mặc định 1000 MIOTA test
  return (
    <WalletContext.Provider value={{ wallet, setWallet }}>
      {children}
    </WalletContext.Provider>
  );
}