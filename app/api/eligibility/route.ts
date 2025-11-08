import { NextResponse } from "next/server";
import { createPublicClient, http, getAddress, formatUnits, parseUnits } from "viem";
import { bsc } from "viem/chains";

const ERC20_ABI = [
  { constant: true, inputs: [{ name: "owner", type: "address" }], name: "balanceOf", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" },
  { constant: true, inputs: [], name: "decimals", outputs: [{ name: "", type: "uint8" }], stateMutability: "view", type: "function" },
  { constant: true, inputs: [], name: "symbol", outputs: [{ name: "", type: "string" }], stateMutability: "view", type: "function" },
] as const;

const RPC = process.env.ANKR_BSC_RPC!;
const TOKEN = process.env.ASTER_TOKEN!;
const THRESHOLD = Number(process.env.ASTER_THRESHOLD || "1500");

if (!RPC) throw new Error("Missing ANKR_BSC_RPC");
if (!TOKEN) throw new Error("Missing ASTER_TOKEN");

const client = createPublicClient({ chain: bsc, transport: http(RPC) });

export async function POST(req: Request) {
  try {
    const { wallet } = await req.json();
    if (!wallet) return NextResponse.json({ error: "Missing 'wallet' address" }, { status: 400 });

    const walletAddr = getAddress(wallet as `0x${string}`);
    const tokenAddr = getAddress(TOKEN as `0x${string}`);

    const [decimals, symbol, balance] = await Promise.all([
      client.readContract({ address: tokenAddr, abi: ERC20_ABI, functionName: "decimals" }) as Promise<number>,
      client.readContract({ address: tokenAddr, abi: ERC20_ABI, functionName: "symbol" }) as Promise<string>,
      client.readContract({ address: tokenAddr, abi: ERC20_ABI, functionName: "balanceOf", args: [walletAddr] }) as Promise<bigint>,
    ]);

    const formatted = formatUnits(balance, decimals);
    const thresholdUnits = parseUnits(String(THRESHOLD), decimals);
    const eligible = balance >= thresholdUnits;

    return NextResponse.json({
      wallet: walletAddr,
      token: tokenAddr,
      symbol,
      decimals,
      balance: balance.toString(),
      formatted,
      threshold: THRESHOLD,
      eligible,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unknown error" }, { status: 500 });
  }
}
