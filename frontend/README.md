# POC #6 — Chargeback Lifecycle Tracker

## Real Rails — Payments

An interactive intelligence dashboard that tracks payment disputes through the chargeback lifecycle, from transaction and dispute filing through chargeback, merchant response, representment, and final decision.

## Problem Statement

Chargeback information can become difficult to understand when individual dispute records, lifecycle stages, outcomes, and financial impact are viewed separately.

This proof of concept provides a single dashboard for understanding the current position of chargeback cases, identifying dispute patterns, tracking outcomes, and viewing financial losses.

## Objective

The purpose of this proof of concept is to transform chargeback case information into useful intelligence by showing:

- Chargeback lifecycle stages
- Dispute patterns
- Case outcomes
- Financial losses
- Current dispute positions
- Merchant evidence and representment status

## Working Features

- Chargeback lifecycle visualization
- Total case, transaction value, loss, and pending metrics
- Lifecycle stage counts
- Dispute reason distribution
- Chargeback case table
- Dispute reason filtering
- Current stage filtering
- Final outcome filtering
- Combined filters
- Dynamic summary metrics
- Dynamic lifecycle counts
- Dynamic dispute reason distribution
- Dynamic case table
- Empty/no-result state
- Frontend-to-backend data communication
- Backend unavailable error handling
- Browser refresh support
- Responsive/mobile layout
- Download Sample Data functionality
- Payment intelligence/context section

## Architecture Summary

The application uses a two-part architecture:

### Frontend

The frontend is implemented with Next.js and provides the interactive dashboard, filters, lifecycle visualization, case table, metrics, intelligence content, responsive presentation, and sample-data download.

### Backend

The backend is implemented with FastAPI and provides the chargeback and summary API endpoints used by the frontend.

### Data

The current proof of concept uses a synthetic chargeback dataset for demonstration and validation.

### Data Flow

```text
Synthetic Chargeback Data
          |
          v
      FastAPI Backend
          |
          | REST API
          v
      Next.js Frontend
          |
          v
 Interactive Intelligence Dashboard