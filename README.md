# Calculator App

A responsive calculator built with Next.js, React, TypeScript, and Tailwind CSS. It supports the four basic arithmetic operations, decimal values, negative operands, operator precedence, touch-friendly calculator controls, and three selectable color themes.

## Features

- Addition, subtraction, multiplication, and division
- Decimal input with duplicate-decimal protection
- Negative operands, including expressions such as `3 × -3`
- Standard multiplication and division precedence
- Delete and reset controls
- Clear error states for invalid expressions and non-finite results
- Three themes:
  1. Default dark theme
  2. Light theme
  3. Purple theme
- Responsive layout for mobile and desktop screens
- Accessible button labels, theme radio controls, focus styles, and screen-reader result announcements
- Horizontal scrolling for long expressions and results

## Tech stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Vitest](https://vitest.dev/) and Testing Library
- League Spartan via `next/font/google`

The calculator uses the local `calculate` function in [`app/lib/calculator.ts`](./app/lib/calculator.ts) to parse and evaluate expressions. It does not rely on `mathjs` at runtime.

## Getting started

### Prerequisites

- Node.js compatible with the installed Next.js version
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Available scripts

| Command            | Description                                |
| ------------------ | ------------------------------------------ |
| `npm run dev`      | Start the Next.js development server       |
| `npm run build`    | Create a production build                  |
| `npm run start`    | Start the production server after building |
| `npm run lint`     | Run ESLint                                 |
| `npm test`         | Run Vitest in watch mode                   |
| `npm run test:run` | Run the test suite once                    |

## Calculator behavior

The calculator builds an expression from the keypad and evaluates it when `=` is pressed.

- The displayed `x` multiplication symbol is converted to `*` before evaluation.
- Multiplication and division are resolved before addition and subtraction.
- A result is rounded to 12 significant digits to reduce common floating-point display artifacts.
- Invalid expressions return `NaN` from the calculator function and are displayed as `Error`.
- Division by zero produces a non-finite result and is displayed as `Error`.
- After a successful calculation, entering a number starts a new expression; entering an operator continues from the result.
- `DEL` removes the last character, while `RESET` returns the display to `0`.

The parser accepts numbers with optional decimal portions and operators between operands. Expressions are validated before they are evaluated; arbitrary JavaScript is never executed.

## Project structure

```text
app/
├── components/
│   ├── Button.tsx       # Reusable styled calculator button
│   └── Header.tsx       # App title and theme selector
├── lib/
│   ├── calculator.ts    # Expression validation and evaluation
│   └── calculator.test.ts
├── globals.css          # Theme variables and Tailwind design tokens
├── layout.tsx           # Root layout, metadata, and font setup
└── page.tsx             # Calculator UI and interaction state
__tests__/
└── header.test.tsx      # header interaction tests
```

## Testing

Run the complete test suite once:

```bash
npm run test:run
```

The tests cover parser behavior such as precedence, negative operands, decimals, invalid expressions, and division by zero. The component tests cover user interactions including calculation, reset, delete, error handling, and result display behavior.

## Styling and themes

Theme colors are defined as CSS variables in [`app/globals.css`](./app/globals.css). The header updates the `data-theme` attribute on the document root when a theme is selected. Tailwind semantic color tokens reference those variables so the calculator components use the active theme without duplicating styles.

## Deployment

Build and run the production version locally with:

```bash
npm run build
npm run start
```

The app can be deployed to any platform that supports Next.js, including [Vercel](https://vercel.com/).
