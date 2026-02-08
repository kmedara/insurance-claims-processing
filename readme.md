# Insurance Claims Processor

Core logic for an insurance claims processing system. The system evaluates incoming claims based on a few business rules and return a final payout amount.

## Setup

    1. running node 25+
    2. npm i

## Run

    1. npm run build
    2. npm run start

## Testing

    1. npm run build
    2. npm run test

## How to use

## Decisions

- debated on strategy pattern or rule orchestration
  - Chose rule orchestration because logic is highly conditional and may overlap across strategies
  - Algorithms do not differ structurally
  - Frequent changes to rules are easier to manage

## Enhancements
