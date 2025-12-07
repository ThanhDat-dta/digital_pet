import { WalletProvider } from "@/components/WalletContext";
import { WalletConnect } from "@/components/Wallet-connect";
import PetCard from "@/components/sample";

export default function Home() {
  return (
    <WalletProvider>
      <WalletConnect />
      <PetCard />
    </WalletProvider>
  );
}