"use client";

import { useEffect, useState } from "react";

type ChargebackCase = {
  case_id: string;
  transaction_id: string;
  transaction_date: string;
  amount: number;
  dispute_reason: string;
  current_stage: string;
  representment_status: string;
  final_outcome: string;
  loss_amount: number;
};

type Summary = {
  total_cases: number;
  total_transaction_amount: number;
  total_loss: number;
  won_cases: number;
  lost_cases: number;
  pending_cases: number;
};

export default function Home() {
  const [cases, setCases] = useState<ChargebackCase[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
  const [reasonFilter, setReasonFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState("All");
  const [outcomeFilter, setOutcomeFilter] = useState("All");

  useEffect(() => {
    async function loadData() {
      try {
        const [casesResponse, summaryResponse] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/chargebacks"),
          fetch("http://127.0.0.1:8000/api/summary"),
        ]);

        const casesData = await casesResponse.json();
        const summaryData = await summaryResponse.json();

        setCases(casesData);
        setSummary(summaryData);
      } catch (error) {
  console.error("Failed to load chargeback data:", error);
  setError(
    "Unable to load chargeback intelligence. Please make sure the FastAPI backend is running and try again."
  );
} finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // FILTERED CASES
  const filteredCases = cases.filter((item) => {
    const matchesReason =
      reasonFilter === "All" || item.dispute_reason === reasonFilter;

    const matchesStage =
      stageFilter === "All" || item.current_stage === stageFilter;

    const matchesOutcome =
      outcomeFilter === "All" || item.final_outcome === outcomeFilter;

    return matchesReason && matchesStage && matchesOutcome;
  });

  // FILTERED SUMMARY VALUES
  const filteredTotalCases = filteredCases.length;

  const filteredTransactionAmount = filteredCases.reduce(
    (total, item) => total + item.amount,
    0
  );

  const filteredTotalLoss = filteredCases.reduce(
    (total, item) => total + item.loss_amount,
    0
  );

 const filteredPendingCases = filteredCases.filter(
  (item) => item.final_outcome === "Pending"
).length;

const filteredWonCases = filteredCases.filter(
  (item) => item.final_outcome === "Won"
).length;

const filteredLostCases = filteredCases.filter(
  (item) => item.final_outcome === "Lost"
).length;

const stageCounts = filteredCases.reduce(
  (counts, item) => {
    counts[item.current_stage] =
      (counts[item.current_stage] || 0) + 1;

    return counts;
  },
  {} as Record<string, number>
);

  const reasonCounts = filteredCases.reduce(
    (counts, item) => {
      counts[item.dispute_reason] =
        (counts[item.dispute_reason] || 0) + 1;

      return counts;
    },
    {} as Record<string, number>
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-[#030712] text-white flex items-center justify-center">
        <p className="text-lg">Loading Chargeback Intelligence...</p>
      </main>
    );
  }
if (error) {
  return (
    <main className="min-h-screen bg-[#030712] text-white flex items-center justify-center p-6">
      <div className="max-w-lg rounded-2xl border border-red-500/30 bg-gray-900/70 p-8 text-center">
        <h1 className="text-xl font-semibold text-red-400">
          Unable to Load Chargeback Intelligence
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-400">
          {error}
        </p>
      </div>
    </main>
  );
}
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">

        {/* MAIN STAGE */}
        <section className="w-full lg:w-[70%] p-6 lg:p-8">

          {/* HEADER */}
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
              Real Rails • Payments
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight lg:text-4xl">
              Chargeback Lifecycle Tracker
            </h1>

            <p className="mt-3 max-w-2xl text-gray-400">
              Track payment disputes from the initial transaction through
              chargeback, representment, and final outcome.
            </p>
          </div>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">

            <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5">
              <p className="text-sm text-gray-400">
                Total Cases
              </p>

              <p className="mt-2 text-3xl font-bold">
                {filteredTotalCases}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5">
              <p className="text-sm text-gray-400">
                Transaction Value
              </p>

              <p className="mt-2 text-3xl font-bold">
                ${filteredTransactionAmount.toFixed(2)}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5">
              <p className="text-sm text-gray-400">
                Total Loss
              </p>

              <p className="mt-2 text-3xl font-bold text-red-400">
                ${filteredTotalLoss.toFixed(2)}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5">
              <p className="text-sm text-gray-400">
                Pending
              </p>

              <p className="mt-2 text-3xl font-bold text-yellow-400">
                {filteredPendingCases}
              </p>
            </div>

          </div>

          {/* CHARGEBACK LIFECYCLE */}
<div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900/70 p-6">

  <div>
    <h2 className="text-xl font-semibold">
      Chargeback Lifecycle
    </h2>

    <p className="mt-1 text-sm text-gray-500">
      Current position of filtered cases in the dispute lifecycle
    </p>
  </div>

  <div className="mt-6 flex flex-wrap items-center gap-3">

    {[
      "Purchase",
      "Dispute Filed",
      "Chargeback",
      "Merchant Response",
      "Representment",
      "Final Decision",
    ].map((stage, index) => {

      const count = stageCounts[stage] || 0;

      return (
        <div
          key={stage}
          className="flex items-center gap-3"
        >

          <div className="min-w-[130px] rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3">

            <p className="text-sm font-medium text-cyan-300">
              {stage}
            </p>

            <p className="mt-1 text-2xl font-bold text-white">
              {count}
            </p>

            <p className="text-xs text-gray-500">
              {count === 1 ? "case" : "cases"}
            </p>

          </div>

          {index < 5 && (
            <span className="text-gray-600">
              →
            </span>
          )}

        </div>
      );
    })}

  </div>

</div>
          {/* DISPUTE REASON DISTRIBUTION */}
          <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900/70 p-6">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-xl font-semibold">
                  Dispute Reason Distribution
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Distribution of dispute cases in the current filter
                </p>

              </div>

            </div>

            <div className="mt-6 space-y-4">

              {Object.entries(reasonCounts).map(
                ([reason, count]) => {

                  const percentage =
                    filteredCases.length > 0
                      ? (count / filteredCases.length) * 100
                      : 0;

                  return (
                    <div key={reason}>

                      <div className="mb-2 flex items-center justify-between">

                        <span className="text-sm text-gray-300">
                          {reason}
                        </span>

                        <span className="text-sm font-semibold text-cyan-300">
                          {count}
                        </span>

                      </div>

                      <div
  className="group relative h-3 overflow-hidden rounded-full bg-gray-800"
  title={`${reason}: ${count} ${
    count === 1 ? "case" : "cases"
  } (${percentage.toFixed(1)}%)`}
>
  <div
    className="h-full rounded-full bg-cyan-400 transition-all duration-500"
    style={{
      width: `${percentage}%`,
    }}
  />

  <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-xs text-white shadow-lg group-hover:block">
    <div className="font-semibold">{reason}</div>
    <div className="text-gray-400">
      {count} {count === 1 ? "case" : "cases"} ·{" "}
      {percentage.toFixed(1)}%
    </div>
  </div>
</div>

                    </div>
                  );
                }
              )}

              {filteredCases.length === 0 && (
                <p className="text-sm text-gray-500">
                  No cases match the selected filters.
                </p>
              )}

            </div>

          </div>

          {/* CASE TABLE */}
          <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900/70 p-6">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-semibold">
                Chargeback Cases
              </h2>

              <span className="text-sm text-gray-500">
                Synthetic dataset
              </span>

            </div>

            {/* FILTERS */}
            <div className="mt-5 grid gap-4 md:grid-cols-3">

              {/* DISPUTE REASON */}
              <div>

                <label className="mb-2 block text-sm text-gray-400">
                  Dispute Reason
                </label>

                <select
                  value={reasonFilter}
                  onChange={(e) =>
                    setReasonFilter(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none"
                >

                  <option value="All">
                    All Reasons
                  </option>

                  <option value="Fraudulent transaction">
                    Fraudulent transaction
                  </option>

                  <option value="Product not received">
                    Product not received
                  </option>

                  <option value="Duplicate charge">
                    Duplicate charge
                  </option>

                </select>

              </div>

              {/* CURRENT STAGE */}
              <div>

                <label className="mb-2 block text-sm text-gray-400">
                  Current Stage
                </label>

                <select
                  value={stageFilter}
                  onChange={(e) =>
                    setStageFilter(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none"
                >

                  <option value="All">
                    All Stages
                  </option>

                  <option value="Dispute Filed">
                    Dispute Filed
                  </option>

                  <option value="Merchant Response">
                    Merchant Response
                  </option>

                  <option value="Chargeback">
                    Chargeback
                  </option>

                  <option value="Representment">
                    Representment
                  </option>

                  <option value="Final Decision">
                    Final Decision
                  </option>

                </select>

              </div>

              {/* FINAL OUTCOME */}
              <div>

                <label className="mb-2 block text-sm text-gray-400">
                  Final Outcome
                </label>

                <select
                  value={outcomeFilter}
                  onChange={(e) =>
                    setOutcomeFilter(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm text-white outline-none"
                >

                  <option value="All">
                    All Outcomes
                  </option>

                  <option value="Won">
                    Won
                  </option>

                  <option value="Lost">
                    Lost
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                </select>

              </div>

            </div>

            {/* TABLE */}
            <div className="mt-5 overflow-x-auto">

              <table className="w-full text-left text-sm">

                <thead>

                  <tr className="border-b border-gray-800 text-gray-400">

                    <th className="px-3 py-3">
                      Case
                    </th>

                    <th className="px-3 py-3">
                      Amount
                    </th>

                    <th className="px-3 py-3">
                      Reason
                    </th>

                    <th className="px-3 py-3">
                      Stage
                    </th>

                    <th className="px-3 py-3">
                      Outcome
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredCases.map((item) => (

                    <tr
                      key={item.case_id}
                      className="border-b border-gray-800/70"
                    >

                      <td className="px-3 py-4 font-medium">
                        {item.case_id}
                      </td>

                      <td className="px-3 py-4">
                        ${item.amount.toFixed(2)}
                      </td>

                      <td className="px-3 py-4 text-gray-300">
                        {item.dispute_reason}
                      </td>

                      <td className="px-3 py-4 text-cyan-300">
                        {item.current_stage}
                      </td>

                      <td className="px-3 py-4">

                        <span
                          className={
                            item.final_outcome === "Lost"
                              ? "text-red-400"
                              : item.final_outcome === "Won"
                              ? "text-green-400"
                              : "text-yellow-400"
                          }
                        >
                          {item.final_outcome}
                        </span>

                      </td>

                    </tr>

                  ))}

                  {filteredCases.length === 0 && (
                    <tr>

                      <td
                        colSpan={5}
                        className="px-3 py-8 text-center text-gray-500"
                      >
                        No cases match the selected filters.
                      </td>

                    </tr>
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </section>

        {/* INTELLIGENCE SIDEBAR */}
        <aside className="w-full border-t border-gray-800 bg-gray-950 p-6 lg:w-[30%] lg:border-l lg:border-t-0 lg:p-8">

          {/* SIDEBAR HEADER */}
          <div>

            <p className="text-sm uppercase tracking-widest text-cyan-400">
              Intelligence
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Payment Disputes
            </h2>

          </div>

          {/* WHY THIS MATTERS */}
          <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900/60 p-5">

            <h3 className="font-semibold text-cyan-300">
              Why This Matters
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Chargebacks represent a financial dispute within the payment
              ecosystem. Tracking each stage helps reveal where disputes
              progress, where evidence is required, and where financial losses
              occur.
            </p>

          </div>

          {/* WHO CONTROLS THE RAIL */}
          <div className="mt-5 rounded-2xl border border-gray-800 bg-gray-900/60 p-5">

            <h3 className="font-semibold text-cyan-300">
              Who Controls the Rail
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Chargeback processes involve merchants, cardholders, issuing
              banks, acquiring banks, card networks, and payment processors.
            </p>

          </div>

          {/* CASE OUTCOMES */}
          <div className="mt-5 rounded-2xl border border-gray-800 bg-gray-900/60 p-5">

            <h3 className="font-semibold text-cyan-300">
              Case Outcomes
            </h3>

            <div className="mt-4 space-y-3 text-sm">

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Won
                </span>

                <span className="text-green-400">
                  {filteredWonCases}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Lost
                </span>

                <span className="text-red-400">
                  {filteredLostCases}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-400">
                  Pending
                </span>

                <span className="text-yellow-400">
                  {filteredPendingCases}
                </span>

              </div>

            </div>

          </div>

          {/* DATA SOURCE */}
          <div className="mt-5 rounded-2xl border border-gray-800 bg-gray-900/60 p-5">

            <h3 className="font-semibold text-cyan-300">
              Data Source
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Event-level chargeback records shown here are synthetic data
              created for this proof of concept. Public sources provide
              contextual payment intelligence.
            </p>

          </div>

        </aside>

      </div>

    </main>
  );
}