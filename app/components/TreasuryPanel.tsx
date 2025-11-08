"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Treasury = {
  chain: string;
  address: string;
  balanceWei: string;
  balanceEth: string;
  refreshedAt: string;
};

const REFRESH_MS =
  Number(process.env.NEXT_PUBLIC_TREASURY_REFRESH_MS || "5000") || 5000;

export default function TreasuryPanel() {
  const [treasury, setTreasury] = useState<Treasury | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Correct typing for setInterval return (browser/SSR safe)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const refreshLabel = useMemo(() => `${Math.round(REFRESH_MS / 1000)}s`, []);

  const fetchTreasury = async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/treasury", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed request");
      setTreasury(data);
    } catch (e: any) {
      setErr(e?.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreasury();
    timerRef.current = setInterval(fetchTreasury, REFRESH_MS);

    // Cleanup must always return void, never null
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <div className="treasuryTop">
        <span className="badgeTinyBlue">BASE</span>
        <button onClick={fetchTreasury} disabled={loading} className="buttonGhost">
          {loading ? "Refreshing..." : "Refresh now"}
        </button>
        <small className="pLight">Auto: {refreshLabel}</small>
      </div>

      {err && <div className="errorBox">{err}</div>}

      {treasury && (
        <div className="resultBox mt12">
          <Row k="Chain" v={treasury.chain.toUpperCase()} />
          <Row k="Treasury" v={treasury.address} />
          <Row k="ETH Balance" v={`${treasury.balanceEth} ETH`} />
          <Row k="Updated" v={new Date(treasury.refreshedAt).toLocaleString()} />
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
