import EligibilityChecker from "@/app/components/EligibilityChecker";
import TreasuryPanel from "@/app/components/TreasuryPanel";
import PieChart from "@/app/components/PieChart";
import SocialChips from "@/app/components/SocialChips";


export default function Page() {
  const holdersPct = Number(process.env.NEXT_PUBLIC_DISTR_HOLDERS ?? "60");
  const airdropPct = Number(process.env.NEXT_PUBLIC_DISTR_AIRDROP ?? "40");

  return (
    <main className="main">
      <div className="bgGrid" />

      <header className="topbar">
        <div className="brandLeft">
          <div className="baseChip" />
          <h1 className="brandTitle">BASTER | AIRDROP LIVE FOR ASTER HOLDERS</h1>
        </div>
        <div className="brandRight">
        <SocialChips />

        </div>
      </header>

      <div className="wrapper">
        {/* SECTION 1 — HOW IT WORKS (ENGLISH) */}
        <section className="card">
          <h2 className="h2">1. How it works</h2>
          <div className="howGrid">
            <div>
              <ul className="howBullets">
                <li>
                  <b>Eligibility:</b>Check your wallet and we'll tell you if it qualifies.
                  To qualify, <code>you need</code>, <code>hold ASTER</code> in your <code>wallet</code>.
                </li>
                <li>
                  <b>Treasury:</b>: We show the current fees balance of our Treasury Wallet.
                It refreshes automatically every few seconds so you always see the latest amount..
                </li>
                <li>
                  <b>What we does whit fees:</b>All fees go back into the ecosystem.
              We buy $ASTER with them and then distribute the value: 70% to on-chain Holders (based on snapshots) and 30% to Airdrop recipients..
                </li>
                <li>
                  <b>Fees policy:</b> <u>All fees accrued in the Treasury Wallet will be used to
                  buy ASTER on-chain</u> and distributed periodically:
                  <b> {holdersPct}%</b> to on-chain <b>Holders (snapshot)</b> and
                  <b> {airdropPct}%</b> to <b>Airdrop recipients</b>.
                </li>
                <li>
                  <b>Privacy:</b> We don’t store personal data. We only read public information from the blockchain.
                </li>
                <li>
                  <b>Snapshots:</b> Every time to airdrop $ASTER to our holders.
                </li>
              </ul>
            </div>

            {/* Donut + logo + leyenda */}
            <div className="chartCard">
              <PieChart holdersPct={holdersPct} airdropPct={airdropPct} />
            </div>
          </div>
        </section>

        {/* SECTION 2 — CHECKER */}
        <section className="card">
          <h2 className="h2">2. ASTER Eligibility Checker</h2>
          <EligibilityChecker />
        </section>

        {/* SECTION 3 — TREASURY */}
        <section className="card">
          <h2 className="h2">3. Treasury Wallet</h2>
          <TreasuryPanel />
        </section>
      </div>
    </main>
  );
}
