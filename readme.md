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

upon start, the example claim will be evaluated and the result will be output to the console

## Decisions

- debated on strategy pattern or rule orchestration
  - Chose rule orchestration because logic is highly conditional and may overlap across strategies
  - Algorithms do not differ structurally
  - Frequent changes to rules are easier to manage
  - rules have no dependency, just react based on context

## Enhancements

- Allow rules to be applied conditionally
- allow ordering and rule priority
- user interface
- higher abstraction level for rules
  build rulesets conditionally?
- seperate I/O, data processing, and data access layers
- progress updates/events
- dedicated rules engine class and supporting types
- Integration testing and testing the rule pipeline
- run same priority rules in parallel for performance?
- batch processing
- short circuiting, stopping further pure evaluation when a rule doesn't pass
- rule types for different phases of processing, i.e, defining seperate payout calculation and eligibility rule types
- Stronger typing or rule types for different phases of processing, whether or not they require policy input or not, etc...
- decision tables for eligibility, rules for payout math?
- logic to change individual rule algorithms by state or some other factor
