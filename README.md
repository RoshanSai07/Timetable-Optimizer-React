# Timetable Optimizer

A web-based timetable planning tool built for students of **VIT-AP University**.

Timetable Optimizer helps students explore course offerings, compare faculty and slot combinations, identify timetable clashes, and generate possible schedules before completing their registration through VTOP.

## Features

- **Course Selection** – Browse available courses and select the ones you intend to register for.
- **Faculty & Slot Exploration** – View available faculty members and their corresponding theory and lab slots.
- **Timetable Generation** – Generate possible timetables based on selected courses.
- **Clash Detection** – Identify conflicting slots and avoid overlapping classes.
- **Interactive Planning** – Experiment with different course and faculty combinations.
- **Responsive Interface** – Plan your timetable across desktop and mobile devices.

## Supported Branches

The current `main` branch includes updated course and slot datasets for:

- BCE
- BCA
- BCD

Course information is maintained in structured JSON datasets, separate from the application logic.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS

## Getting Started

**Requirements:** Node.js and npm.

```bash
git clone <repository-url>
cd timetable-optimizer
npm install
npm run dev
```

For a production build:

```bash
npm run build
```

## Important Notice

Timetable Optimizer is an independent student-built planning tool and is not affiliated with or an official service of VIT-AP University.
Course availability, faculty assignments, and slot information may change. Always verify the latest details on the official portal before registering.

---

**Current Version:** `v6
