# UAT Checklist — POC #6 Chargeback Lifecycle Tracker

## Project Information

- Name: Jona Peter
- GitHub Username: jonahpeter2006-12
- PoC Number: 6
- PoC Title: Chargeback Lifecycle Tracker
- Rail: Payments

## Functional Testing

| Test | Result |
|---|---|
| Dashboard loads successfully | PASS |
| FastAPI backend starts successfully | PASS |
| Next.js frontend starts successfully | PASS |
| `/api/summary` returns correct data | PASS |
| `/api/chargebacks` returns chargeback records | PASS |
| Reason filter works | PASS |
| Stage filter works | PASS |
| Outcome filter works | PASS |
| Combined filters work | PASS |
| Dynamic summary metrics update | PASS |
| Lifecycle counts update | PASS |
| Dispute reason distribution updates | PASS |
| Case table updates | PASS |
| Intelligence sidebar updates | PASS |
| Empty/no-result state works | PASS |
| Browser refresh works | PASS |
| Filtered state works after refresh | PASS |

## Backend Validation

### Summary Endpoint

Expected:

- Total cases: 6
- Total transaction amount: 985.49
- Total loss: 215.00
- Won cases: 2
- Lost cases: 2
- Pending cases: 2

Result: PASS

### Chargeback Endpoint

The endpoint returns six synthetic chargeback records:

- CB001
- CB002
- CB003
- CB004
- CB005
- CB006

Result: PASS

## Filter Validation

### Fraudulent Transaction + Chargeback

Expected:
- 1 case
- CB006
- Transaction value: $150.25
- Loss: $150.25

Result: PASS

### Lost Outcome

Expected:
- 2 cases
- CB004
- CB006
- Transaction value: $215.00
- Total loss: $215.00

Result: PASS

### Zero-Result Combination

A filter combination producing no matching records was tested.

Expected behavior:
- Metrics become zero
- Lifecycle counts become zero
- Distribution shows no matching data
- Case table shows no matching records

Result: PASS

## Frontend-Backend Communication

The Next.js frontend successfully receives chargeback data from the FastAPI backend.

Result: PASS

## Data Integrity

The values displayed in the dashboard match the synthetic JSON dataset and API responses.

Result: PASS

## Refresh Validation

The dashboard was refreshed while filters were active and continued to display the correct filtered data.

Result: PASS

## UAT Result

**PASS**

The current implementation satisfies the tested Phase 1 functional requirements.

## Known Limitations

The event-level chargeback dataset is synthetic and is intended for proof-of-concept demonstration.

Public sources provide contextual payment intelligence and are not represented as the source of the synthetic case records.