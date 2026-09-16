# AGENTS.md - Multi-Agent Development Guide

## Agent Roles & Responsibilities

### 1. Review & Defect Intelligence Specialist
- Responsible for parsing unstructured review text across Shopify, Amazon, and marketplaces.
- Maps feedback to the 6 core aspect dimensions: `fit`, `quality`, `shipping`, `price`, `usability`, `service`.
- Calculates sentiment scores (-1.0 to 1.0) and urgency levels.

### 2. Growth & A/B Experimentation Specialist
- Formulates structured hypotheses following standard product experimentation formats:
  - Problem Statement (Quantified)
  - Hypothesis Statement
  - Expected Metric Impact (Return Reduction, Retained Margin)
  - Gherkin User Story Specification for QA and engineering handoff.

### 3. Database & Telemetry Specialist
- Manages the SQLite/Prisma schema, relations, and data integrity.
- Ensures fast aggregation of executive metrics without blocking page renders.
