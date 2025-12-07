"use client"
import { ConnectButton } from "@iota/dapp-kit"
import { useWallet } from "./WalletContext";
import { useState } from "react";

export function WalletConnect() {
  const { wallet, setWallet } = useWallet();
  const [manualAddress, setManualAddress] = useState("");

  // Nếu sau này có hook lấy address từ dapp-kit thì SỬA ĐOẠN NÀY lại lấy từ hook.
  const handleSetManualAddress = () => {
    if (manualAddress) {
      setWallet({ ...wallet, address: manualAddress });
      setManualAddress("");
    }
  };

  return (
    <div style={{ padding: "1rem", display: "flex", justifyContent: "flex-end", gap: 16 }}>
      <ConnectButton />
      {/* Nếu lấy được address thật từ dapp-kit, show ở đây luôn */}
      {wallet.address ? (
        <span style={{ color: "#333", background: "#eee", borderRadius: 24, padding: "6px 14px", fontWeight: 600 }}>
          {wallet.address.slice(0,8)}...{wallet.address.slice(-4)}
        </span>
      ) : (
        <>
          {/* TEST: Cho nhập address để lấy trạng thái connect */}
          <input
            value={manualAddress}
            placeholder="Nhập ví test"
            onChange={e=>setManualAddress(e.target.value)}
            style={{borderRadius:12, padding:6}}
          />
          <button onClick={handleSetManualAddress}>Xác nhận</button>
        </>
      )}
    </div>
  );
}