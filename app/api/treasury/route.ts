import { NextResponse } from "next/server";
import { createPublicClient, http, formatEther, getAddress } from "viem";
import { base } from "viem/chains";

const RPC = process.env.ANKR_BASE_RPC!;
const TREASURY = process.env.TREASURY_WALLET!;

if (!RPC) throw new Error("Missing ANKR_BASE_RPC");
if (!TREASURY) throw new Error("Missing TREASURY_WALLET");

const client = createPublicClient({ chain: base, transport: http(RPC) });

export async function GET() {
  try {
    const addr = getAddress(TREASURY as `0x${string}`);
    const balance = await client.getBalance({ address: addr });
    return NextResponse.json({
      chain: "base",
      address: addr,
      balanceWei: balance.toString(),
      balanceEth: formatEther(balance),
      refreshedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
