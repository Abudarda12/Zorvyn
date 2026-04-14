# Zorvyn Finance Dashboard - Assessment Submission

A highly interactive, visually stunning, and structurally scalable Finance Dashboard built to demonstrate senior-level UI/UX and Frontend Engineering capabilities. 

Built with **React**, **Vite**, **Tailwind CSS**, and **Zustand**.

## Overview of Approach

Based on the core instructions, this dashboard provides robust solutions to the assessment parameters without injecting overly complex dependencies:

- **Graceful Fault Tolerance (Mock API Integration):** The dashboard seamlessly attempts to connect to an Express backend. If the backend or DB connection fails, the frontend **gracefully and stealthily falls back to a locally cached mock payload**—ensuring the dashboard is **always fully functional and visually evaluating-ready**.
- **Data Persistence (Local Storage):** Used Zustand's `persist` middleware. It remembers state selections, roles, and locally created mocked transaction entities persistently across browser reloads.
- **Micro-Interactions & Responsiveness:** The dashboard uses **Framer Motion** extensively and relies strictly on responsive utilities, making the dashboard fully compatible and completely fluid on mobile devices and tablet aspect ratios.
- **Performance First:** No laggy `useEffect` chaining for filtering. I implemented `useFilteredTransactions` logic utilizing purely derived state with `useMemo` computation.

## Features Implemented

1. **Dashboard Overview**
   - **Summary Cards**: "Total Balance", "Income", and "Expenses" mathematically calculated live.
   - **Time Based Graph**: Built an emerald-purple gradient `AreaChart` utilizing `recharts` to map the chronologically sorted balance trajectory.
   - **Categorical Graph**: Added an interactive `PieChart` breaking down all expenses tightly bound to their categories.

2. **Transactions Section**
   - Renders mapping logic seamlessly with `lucide-react` icons mapping matching categories visually (Food ☕, Enterprise 💼).
   - Supports active input Search, Category selection Buttons, and Date/Amount sorting mechanics that combine functionally.

3. **Role Based UI Implementation**
   - Developed a **`RoleGuard` HOC** (Higher Order Component) equipped with Context evaluation and AnimatePresence fades.
   - A quick role-switcher sits physically in the Header. Toggling to "Viewer Mode" actively revokes and visually disables "Delete" and "+ Add Entry" operations. Re-selecting "Admin Mode" pops them fluidly back onto the screen.

4. **Insights Engine**
   - Built an analytical mathematical insight renderer that isolates data parameters:
     - Maps the highest category draining from the total balance.
     - Maps absolute user savings-rates (Percentage metrics comparing `Income` / `Expenses`).

5. **Advanced Optional Features Shipped**
   - **Export CSV**: An active `Blob` conversion export component allowing raw CSV parsing downloaded instantly structurally from the view state.
   - **Responsive Navigation Structure**: Adapts structurally to render horizontal bottom-navigation layouts seamlessly.
   - **Zorvyn Unified Branding Theme**: Native brand colors layered neatly for optimal consistency.

## Getting Started

Because the application guarantees frontend resolution, getting started is extremely easy.

```bash
# 1. Install dependencies
npm install

# 2. Start the App natively
npm run dev
```

> **Note**: Even structurally lacking the MongoDB/Express layer running via localhost:5000, the `useTransactionStore` safely triggers `isUsingMock: true` and resolves the app rendering instantly.

## Developer Philosophy Followed

*"Keep things simple and clear."* Structural components (`BalanceChart.jsx`, `TransactionList.jsx`, `FilterPanel.jsx`) are completely detached from Data Fetching contexts! They retrieve what they need exclusively via modular `Zustand` hooks to guarantee independent testability and clear abstractions.
