# PoC #6 — Chargeback Lifecycle Tracker

## Real Rails — Payments

An interactive intelligence dashboard that tracks payment disputes through the chargeback lifecycle, from transaction and dispute filing through chargeback, merchant response, representment, and final decision.

## Problem Statement

Chargeback information can be difficult to understand when dispute records, lifecycle stages, outcomes, and financial impact are viewed separately. This project brings that information together in one interactive dashboard.

## Objective

The objective is to transform chargeback case information into useful intelligence by showing lifecycle stages, dispute patterns, case outcomes, financial losses, and merchant evidence status.

## Working Features

- Chargeback lifecycle visualization
- Summary metrics and lifecycle stage counts
- Dispute reason distribution
- Chargeback case table
- Search and filters
- Dynamic dashboard metrics
- Payment intelligence/context section
- Backend data integration and error handling
- Responsive layout
- Download Sample Data functionality

## Architecture

- **Frontend:** Next.js
- **Backend:** FastAPI
- **Data:** Synthetic chargeback records for proof-of-concept demonstration

### Data Flow

Synthetic Chargeback Data → FastAPI Backend → REST API → Next.js Frontend → Interactive Dashboard

## Data Disclosure

The event-level chargeback records are synthetic and intended for proof-of-concept demonstration. Public sources provide contextual payment intelligence and are not represented as the source of the synthetic case records.

## Validation Status

- VAR Report: PASS
- UAT Checklist: PASS

## Screenshots
![alt text](<Screenshot 2026-10-15 211611.png>)
![alt text](<Screenshot 2026-10-15 211625.png>)
![alt text](<Screenshot 2026-10-15 211637.png>)


## Future Enhancements

- Expanded dispute pattern analysis
- Additional lifecycle and outcome reporting
- Further automated testing
- Production data integration where authorized

## Known Limitations

This is a proof-of-concept application. The chargeback event records are synthetic and should not be interpreted as real customer or transaction records.
