"use client";
import { useEffect, useState } from "react";
import { useWallet } from "./WalletContext";

function clamp(num: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, num));
}

const GIFT_COST = 50;

export default function PetCard() {
  const { wallet, setWallet } = useWallet();
  const [pet, setPet] = useState({
    hunger: 50,
    energy: 40,
    happiness: 60,
    fun: 50,
    xp: 0,
    level: 1,
  });

  const levelThresholds = [0, 20, 50, 100, 180, 300];

  useEffect(() => {
    setPet(prev => {
      const newLevel = levelThresholds.filter((threshold) => prev.xp >= threshold).length;
      return newLevel !== prev.level ? { ...prev, level: newLevel } : prev;
    });
  }, [pet.xp]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPet(prev => {
        let { hunger, energy, happiness, fun, xp, level } = prev;
        hunger = clamp(hunger + 2);
        energy = clamp(energy - 2);
        fun = clamp(fun - 1);
        happiness = clamp(happiness - (hunger > 90 ? 5 : 0) - (energy < 10 ? 7 : 0));
        return { hunger, energy, happiness, fun, xp, level };
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  
  // Claim XP vào ví
  const claimXPtoWallet = () => {
    if (!wallet.address) {
      alert("Bạn cần kết nối ví IOTA trước!");
      return;
    }
    setWallet({ ...wallet, balance: wallet.balance + pet.xp });
    setPet(prev => ({ ...prev, xp: 0 }));
    alert(`Đã gửi ${pet.xp} XP vào ví. Tổng MIOTA: ${wallet.balance + pet.xp}`);
  };

  // Mua quà cho pet
  const buyGiftForPet = () => {
    if (!wallet.address) {
      alert("Bạn cần kết nối ví IOTA trước!");
      return;
    }
    if (wallet.balance < GIFT_COST) {
      alert(`Bạn không đủ MIOTA để mua quà! Cần ${GIFT_COST}, bạn có ${wallet.balance}`);
      return;
    }
    setWallet({ ...wallet, balance: wallet.balance - GIFT_COST });
    setPet(prev => ({
      ...prev,
      happiness: clamp(prev.happiness + 30),
      fun: clamp(prev.fun + 30)
    }));
    alert("Đã mua quà cho pet! Happiness và Fun tăng!");
  };

  const feed = () =>
    setPet(prev => ({
      ...prev,
      hunger: clamp(prev.hunger - 20),
      happiness: clamp(prev.happiness + 5),
      xp: prev.xp + 4,
    }));

  const play = () =>
    setPet(prev => ({
      ...prev,
      fun: clamp(prev.fun + 15),
      happiness: clamp(prev.happiness + 10),
      hunger: clamp(prev.hunger + 8),
      energy: clamp(prev.energy - 10),
      xp: prev.xp + 6,
    }));

  const sleep = () =>
    setPet(prev => ({
      ...prev,
      energy: clamp(prev.energy + 25),
      fun: clamp(prev.fun - 5),
      hunger: clamp(prev.hunger + 10),
      happiness: clamp(prev.happiness - 3),
      xp: prev.xp + 3,
    }));

  const bath = () =>
    setPet(prev => ({
      ...prev,
      happiness: clamp(prev.happiness + 12),
      fun: clamp(prev.fun + 5),
      xp: prev.xp + 2,
    }));

  return (
    <div style={{
      background: '#242426',
      color: '#fff',
      padding: '32px 32px 28px 32px',
      borderRadius: '23px',
      width: '346px',
      margin: '50px auto',
      boxShadow: '0 2px 16px #0008',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "8px", fontWeight: 500 }}>
        🐶 My Digital Pet
        <div style={{fontWeight:700, fontSize:"1.2em"}}>Level {pet.level} | XP {pet.xp}</div>
      </h2>
        <div style={{
        marginBottom: 16,
        fontSize: "1.08em",
        minHeight: 22,
        color: "#1ca9d4",
        fontWeight: 600,
        width: "100%",
        textAlign: "left"
      }}>
        Số dư: {wallet.balance} MIOTA
      </div>
      <div style={{marginBottom:1}}></div>
      <StatusBar label="Hunger" value={pet.hunger} color="#4caf50"/>
      <StatusBar label="Energy" value={pet.energy} color="#607d8b"/>
      <StatusBar label="Happiness" value={pet.happiness} color="#ff9800"/>
      <StatusBar label="Fun" value={pet.fun} color="#00bcd4"/>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap:14, marginTop: '18px', width:"100%" }}>
        <button className="pet-btn" onClick={feed}>Feed</button>
        <button className="pet-btn" onClick={play}>Play</button>
        <button className="pet-btn" onClick={sleep}>Sleep</button>
        <button className="pet-btn" onClick={bath}>Bath</button>
      </div>
      <button
        onClick={claimXPtoWallet}
        style={{
          width:"100%",marginTop:18,padding:"11px 0",
          borderRadius:8,background:"#1976d2",color:"#fff",
          fontSize: "1.07em",fontWeight:500, border:'2px solid #2b7be6'
        }}
      >Claim XP về ví IOTA</button>
      <button
        onClick={buyGiftForPet}
        style={{
          width:"100%",marginTop:11,padding:"11px 0",
          borderRadius:8,background:"#ffa94d",color:"#242426",
          fontSize:"1.07em",fontWeight:600, border:'none'
        }}
      >Mua quà cho Pet (trừ {GIFT_COST} MIOTA)</button>
      <style jsx>{`
        .pet-btn {
          background:#333;border:none;color:#fff;border-radius:8px;padding:6px 16px;
          font-weight:500;cursor:pointer;transition:background .2s;
        }
        .pet-btn:hover { background: #484851; }
      `}</style>
    </div>
  );
}

// STATUS BAR FIX: Label width cố định, progress liền nhau, số % luôn vững, không nhảy hàng dù 2 hay 3 số
function StatusBar({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div style={{
      marginBottom: '10px',
      width:'100%',
      display:'flex',
      alignItems:'center'
    }}>
      <span style={{
        width:'96px',
        minWidth:'96px',
        maxWidth:'96px',
        textAlign:'left',
        fontSize: '1em',
        display: 'inline-block',
        verticalAlign: 'middle',
        paddingRight:10,
        color:'#fff'
      }}>
        {label}:
      </span>
      <progress value={clamp(value)} max={100}
        style={{
          width: '140px',
          minWidth: '140px',
          accentColor: color || "#fff", height: "14px",
          backgroundColor:"#444",verticalAlign:'middle',marginRight:10
        }} />
      <span style={{
        color:'#ccc',textAlign:'right',
        width:'45px', minWidth:'45px', fontSize:'0.99em', fontWeight:500,
        display:'inline-block', verticalAlign:'middle'
      }}>
        {clamp(value)}%
      </span>
    </div>
  );
}