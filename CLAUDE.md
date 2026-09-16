# CLAUDE.md - Developer Guidelines

## Project Overview
**E-Commerce Growth & Review Intelligence Engine**
An AI-native platform designed to diagnose e-commerce returns, extract aspect-based review sentiments, and generate actionable product hypotheses for PMs.

## Commands
- **Dev Server:** `npm run dev`
- **Build:** `npm run build`
- **Unit Tests:** `npm run test`
- **E2E Tests:** `npm run test:e2e`
- **DB Push:** `npm run db:push`
- **DB Seed:** `npm run db:seed`
- **Lint:** `npm run lint`

## Code Standards & Architecture
- **Next.js 15 App Router:** Always prefer Server Components for data fetching from Prisma.
- **Zero-Config AI:** All AI endpoints must gracefully fall back to `MockAiEngine` when API keys are absent.
- **Type Safety:** Strict TypeScript everywhere; avoid `any`. Use zod schemas for external payloads.
- **Testing:** New analysis rules must be accompanied by Vitest unit tests in `src/__tests__/`.
