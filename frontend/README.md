# POC #6 — Chargeback Lifecycle Tracker

## Real Rails — Payments

An interactive intelligence dashboard that tracks payment disputes through the chargeback lifecycle, from transaction and dispute filing through chargeback, merchant response, representment, and final decision.

## Objective

The purpose of this proof of concept is to transform chargeback case information into useful intelligence by showing:

- Chargeback lifecycle stages
- Dispute patterns
- Case outcomes
- Financial losses
- Current dispute positions
- Merchant evidence and representment status

## Project Structure

```text
POC-6-ChargebackLifecycleTracker-JonaPeter/
│
├── backend/
│   ├── app/
│   │   └── main.py
│   └── data/
│       └── mock_data.json
│
├── frontend/
│   └── app/
│       └── page.tsx
│
├── VAR_REPORT.md
├── UAT_CHECKLIST.md
├── README.md
└── repomix-output.xml