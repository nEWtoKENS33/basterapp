"use client";

import { useState } from "react";

type Elig = {
  wallet: string;
  token: string;
  symbol: string;
  decimals: number;
  balance: string;
  formatted: string;
  threshold: number;
  eligible: boolean;
};

export default function EligibilityChecker() {
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Elig | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed request");
      setResult(data);
    } catch (err: any) {
      setError(err?.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleCheck} className="form">
        <input
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          placeholder="0xYourWallet..."
          className="input"
          required
        />
        <button type="submit" disabled={loading} className="buttonPrimary">
          {loading ? "Checking..." : "Check Eligibility"}
        </button>
      </form>

      {error && <div className="errorBox">{error}</div>}

      {result && (
        <div className="resultBox">
          <Row k="Wallet" v={result.wallet} />
          <Row k="Token" v={result.token} />
          <Row k="Symbol" v={result.symbol} />
          <Row k="Balance" v={`${result.formatted} ${result.symbol}`} />

          <div className="eligRow">
            <span
              className={`badge ${result.eligible ? "badgeOk" : "badgeKo"}`}
            >
              {result.eligible ? "QUALIFIES" : "NOT QUALIFIED"}
            </span>
           
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="kv">
      <span className="key">{k}</span>
      <span className="val">{v}</span>
    </div>
  );
}
