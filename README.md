# ✈️ Flight Schedule Management

A high-performance **Flight Schedule Management Dashboard** built with **React, TypeScript, and Vite**.
This application simulates a real-world internal operations tool for managing flight schedules with efficient handling of large datasets and smooth user interactions.

---

## 📌 Overview

This project demonstrates:

* Efficient rendering of large datasets using **virtualization**
* Robust state management with **predictable updates**
* Real-time data manipulation (edit, filter, delete)
* Clean and scalable frontend architecture

All operations are performed **client-side using local state**, simulating real backend behavior.

---

## 🚀 Features

### 📊 Flight Table (Performance Optimized)

* Virtualized rendering using `react-window`
* Smooth scrolling for large datasets (200+ records)
* Minimal DOM load for better performance

---

### ✏️ Inline Editing

* Edit rows directly within the table
* Editable fields:

  * Date
  * STD (Scheduled Departure Time)
  * STA (Scheduled Arrival Time)
  * Status
* Actions:

  * Save (with simulated API delay)
  * Cancel (revert changes)

#### Save Behavior:

* Optimistic UI update
* Loading indicator during save
* Simulated API delay using `setTimeout`
* Random failure handling:

  * Rollback to previous state
  * Error indicator displayed

---

### 🔘 Status Toggle

* Instant toggle between **Active / Inactive**
* Immediate UI and state update

---

### 🗑️ Delete Functionality

* Delete individual rows
* Multi-select support for bulk deletion
* Efficient state updates

---

### 🔍 Search

* Search across:

  * Flight Number
  * Origin
  * Destination
* Works seamlessly with all active filters

---

### 🎯 Advanced Filters (AND Logic)

All filters work together using **AND conditions**:

* 📅 Date Range
  Filters flights where operational dates overlap with selected range

* 📆 Days of Operation
  Multi-select (Monday–Sunday)

* ⚡ Status
  Active / Inactive

* ✈️ AOC (Airline Operating Code)

* 🛫 Body Type
  Narrow Body / Wide Body

* ❌ Clear All
  Reset all filters instantly

---

## 🧠 State Management

State is handled using `useReducer` for better control and scalability.

**Location:**

```
src/features/flights/hooks/useFlights.ts
```

### Responsibilities:

* Filters & search handling
* Row editing state
* Selection state (multi-delete)
* Async save simulation
* Error handling & rollback
* Optimistic updates

---

## 🏗️ Project Structure

```
src/
 ┣ features/
 ┃ ┗ flights/
 ┃   ┣ components/
 ┃   ┣ hooks/
 ┃   ┣ utils/
 ┃   ┗ types/
 ┣ components/
 ┣ utils/
 ┣ App.tsx
 ┗ main.tsx
```

---

## 🛠️ Tech Stack

* **React**
* **TypeScript**
* **Vite**
* **react-window** (virtualization)
* **ESLint**

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd flight-schedule-management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

---

## 📦 Available Scripts

| Command           | Description                     |
| ----------------- | ------------------------------- |
| `npm run dev`     | Start development server        |
| `npm run build`   | Type-check and production build |
| `npm run preview` | Preview production build        |
| `npm run lint`    | Run ESLint                      |

---

## ⚠️ Node Version Requirement

This project uses Vite 8, which requires:

* Node.js **>= 20.19**
  OR
* Node.js **>= 22.12**

---

## 📌 Assumptions

* All data is loaded once and managed on the client side
* No backend integration is required
* API behavior is simulated using timeouts

---

## 🔥 Highlights

* Performance-focused implementation
* Clean and modular architecture
* Real-world scenario simulation
* Strong error handling and UX considerations

---

## 📬 Submission

This repository is part of a take-home assessment for a **Senior React Developer role**.

---

## 👨‍💻 Author

**Bhagwan Singh**

---

## 📄 License

This project is for assessment purposes only.
